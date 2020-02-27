import React from 'react';
import { shallow } from 'enzyme';
import App from './';
import * as Mocks from '../../mocks';

describe('App Container', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('methods', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    wrapper.setState({ players: Mocks.players });

    afterEach(() => {
      wrapper.setState({ matchPlayers: [], winnerId: undefined, correctGuessCount: 0 });
    });

    describe('cleanPlayerData(players)', () => {
      it('returns a new players array without null values', () => {
        instance.cleanPlayerData(Mocks.uncleanPlayers);
        expect(instance.cleanPlayerData(Mocks.uncleanPlayers)).toEqual(Mocks.players);
      });
    });

    describe('createMatch()', () => {
      it('sets `matchPlayers` to an array of 2', () => {
        instance.createMatch();
        const matchedPlayers = wrapper.state('matchPlayers');

        expect(matchedPlayers.length).toEqual(2);
        expect(Mocks.players.some(p => matchedPlayers[0].id)).toBe(true);
        expect(Mocks.players.some(p => matchedPlayers[1].id)).toBe(true);
      });
    });

    describe('selectPlayer(id)', () => {
      beforeEach(() => {
        instance.createMatch();
      })

      it('correctGuessCount starts at 0', () => {
        expect(wrapper.state('correctGuessCount')).toEqual(0);
      });
      
      
      it('adds a correct guess', () => {
        const mp = wrapper.state('matchPlayers');
        const winner = mp[0].fppg > mp[1].fppg ? mp[0] : mp[1];
        instance.selectPlayer(winner.id);
        
        expect(wrapper.state('correctGuessCount')).toEqual(1);
      });

      it('does not add a wrong guess', () => {
        const mp = wrapper.state('matchPlayers');
        const loser = mp[0].fppg < mp[1].fppg ? mp[0] : mp[1];
        instance.selectPlayer(loser.id);

        expect(wrapper.state('correctGuessCount')).toEqual(0);
      });
    });

    describe('calculateWinner(player1, player2)', () => {
      it('returns the id of the player with a higher fppg', () => {
        const [player1, player2] = Mocks.players;
        instance.calculateWinner(player1, player2);

        expect(wrapper.state('winnerId')).toEqual(player1.id);
      });
    });

    describe('resetGame()', () => {
      beforeEach(() => {
        instance.createMatch();
      });
      
      it('sets the correctGuessCount to 0', () => {
        instance.resetGame();
        expect(wrapper.state('correctGuessCount')).toEqual(0);
      });

      it('creates a new match', () => {
        instance.resetGame();
        expect(wrapper.state('matchPlayers').length).toBe(2);
      });
    });
  });
});
