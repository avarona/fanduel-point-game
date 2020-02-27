/**
 * Concats the first and last name of a player
 * 
 * @param first_name 
 * @param last_name 
 */
export const concatFullName = (first_name, last_name) => `${first_name} ${last_name}`;

/**
 * Rounds up a number to the nearest 100th decimal
 * 
 * @param number 
 */
export const roundNumber = (number) => number.toFixed(2)

/**
 * Selects a random element(s) from a given array
 * 
 * @param array array of elements to pick at random
 * @param amount number of elements to select at random
 */
export const selectRandom = (array, amount) => {
    if(amount) {
        const splicer = [...array];
        let result = [];
        for(let i = 0; i < amount; i++) {
            const index = Math.floor(Math.random() * splicer.length);
            result.push(splicer.splice(index, 1)[0]);
        }
        return result;
    }
    return array[Math.floor(Math.random() * array.length)];
};