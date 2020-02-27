import axios from 'axios';
import { FETCH_PLAYERS_URL } from './constants';

export const fetchPlayers = axios.get(FETCH_PLAYERS_URL);