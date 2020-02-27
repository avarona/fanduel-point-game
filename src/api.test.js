import axios from 'axios';
import { fetchPlayers } from './api';
import { FETCH_PLAYERS_URL } from './constants';

jest.mock('axios');

describe('API calls', () => {
    describe('fetchPlayers()', () => {
        it('good resposne', async () => {
            const success = 'Success :)';
            axios.get.mockImplementationOnce(() => Promise.resolve(success));

            await fetchPlayers;
            expect(axios.get).toHaveBeenCalledWith(FETCH_PLAYERS_URL);
        });

        it('bad response', async () => {
            const error = 'Error :)';
            axios.get.mockImplementationOnce(() => Promise.reject(error));

            await fetchPlayers;
            expect(axios.get).toHaveBeenCalledWith(FETCH_PLAYERS_URL);
        })
    });
});