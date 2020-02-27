import React from 'react';
import Player from '../Player';
import styles from './styles.module.css';
import { AppContext } from '../../AppContext';

const Match = ({ players }) => {
    const [player1, player2] = players;
    return (
        <AppContext.Consumer>
            {({ winnerId, nextMatch, totalGuessCount, correctGuessCount, resetGame }) => (
                <div className={styles.matchContainer}>
                    <div className={styles.guessCounter}>
                        <span className={styles.guessTitle}>Win / Loss</span>
                        <span>{correctGuessCount} / {totalGuessCount - correctGuessCount}</span>
                    </div>

                    <div className={styles.players}>
                        <Player details={player1} />
                        <span className={styles.textBetween}>VS</span>
                        <Player details={player2} />
                    </div>

                    {/* show next button only when winner is calculated */}
                    {winnerId && 
                        (correctGuessCount < 10
                            ? <button className={styles.nextButton} onClick={nextMatch}>NEXT</button>
                            : <div className={styles.endGame}>
                                <span className={styles.endText}>Congrats, you made 10 correct guesses!</span>
                                <button className={styles.endButton} onClick={resetGame}>RESET</button>
                            </div>)
                    }
                </div>
            )}
        </AppContext.Consumer>
    )
};

export default Match;