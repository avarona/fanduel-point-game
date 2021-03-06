import React from 'react';
import { fetchPlayers } from '../../api';
import { selectRandom } from '../../utils';
import { AppContextProvider } from '../../AppContext';

import styles from './styles.module.css';
import Match from '../../components/Match';

class App extends React.Component {
  state = {
    loading: true, // app loading state
    players: [], // player pool from api call
    matchPlayers: [], // "tuple" of 2 players head to head
    selectId: undefined, // user selected player
    winnerId: undefined, // id of player with higher fppg
    totalGuessCount: 0,
    correctGuessCount: 0 // user's correct guess count
  }
  
  componentDidMount() {    
    // fetch and store players to App's state
    fetchPlayers.then(({ data }) => {
      const { players } = data;

      this.setState({ players: this.cleanPlayerData(players) }, () => {
        this.createMatch(); // create the match once players are retrieved from backend
        this.setState({ loading: false }); // set loading state after the players are set to the app state
      });
    });
  }

  /**
   * Ensure that the data from the api call is valid
   * Note: best to do this on the back end and not have null values
   * 
   * @param players - array of players to remove bad data (ie null fppg)
   */
  cleanPlayerData = (players) => {
    return players.filter(p => !!p.first_name && !!p.last_name && !!p.images.default.url && !!p.fppg);
  }
  
  /**
   * Creates a new match of 2 random players
   */
  createMatch = () => {
    const { players } = this.state;
    const matchPlayers = selectRandom(players, 2);
    this.setState({ matchPlayers, winnerId: undefined, selectId: undefined });
  }
  
  /**
   * Click handler for selecting the user's guess
   * 
   * @param id - player id
   */
  selectPlayer = (id) => {
    const { matchPlayers, totalGuessCount, correctGuessCount } = this.state;
    this.setState({ selectId: id, totalGuessCount: totalGuessCount + 1 });

    const winnerId = this.calculateWinner(...matchPlayers);
    if(winnerId === id) this.setState({ correctGuessCount: correctGuessCount + 1 });
  };
  
  /**
   * Determines the player with the highest fppg and sets him as the winner
   * 
   * @param player1 - player 1 obj
   * @param player2 - player 2 obj
   */
  calculateWinner = (player1, player2) => {
    if(player1.fppg === player2.fppg) this.setState({ winnerId: -1 });

    const winnerId = player1.fppg > player2.fppg ? player1.id : player2.id

    this.setState({ winnerId });

    return winnerId;
  }

  /**
   * Resets guess count & creates a new match
   */
  resetGame = () => this.setState({ correctGuessCount: 0, totalGuessCount: 0 }, this.createMatch);

  /**
   * Sets the context value to be fed to the Provider below
   */
  get contextValue() {
    return { 
      ...this.state,
      selectPlayer: this.selectPlayer,
      nextMatch: this.createMatch,
      resetGame: this.resetGame
    }
  }

  render() {
    const { loading, matchPlayers } = this.state;

    return (
      <AppContextProvider value={this.contextValue}>
        <h1 className={styles.heading}>Who has the greater FPPG?</h1>
        <main className={styles.appContainer}>
          {loading 
            ? <div>Loading...</div>
            : <Match players={matchPlayers} />}
        </main>
      </AppContextProvider>
    )
  }
}

export default App;
