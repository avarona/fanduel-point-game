export const players = [
    {id: 1, first_name: 'Kobe', last_name: 'Bryant', fppg: 15, images: { default: { url: 'slick pic' }}},
    {id: 2, first_name: 'Lebron', last_name: 'James', fppg: 10, images: { default: { url: 'the dunker' }}},
    {id: 3, first_name: 'Michael', last_name: 'Jordan', fppg: 5, images: { default: { url: 'the legend' } }}
];

export const uncleanPlayers = [
    ...players,
    {id: 4, first_name: 'Larry', last_name: 'Bird', fppg: null, images: { default: { url: 'the legend' } }},
    {id: 5, first_name: 'Magic', last_name: '', fppg: 5, images: { default: { url: 'the legend' } }}
]

export const matchPlayers = [players[0], players[1]];

export const playerDetails = players[0];