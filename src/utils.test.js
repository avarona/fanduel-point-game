import { concatFullName, selectRandom } from './utils';

describe('Util functions', () => {
    describe('concatFullName()', () => {
        it('returns a full name', () => {
            const firstName = 'Richie';
            const lastName = 'McCaw'
            const fullName = concatFullName(firstName, lastName);
            expect(fullName).toEqual(`${firstName} ${lastName}`);
        });
    });

    describe('selectRandom()', () => {
        const mockArray = [1,2,3,4,5];

        describe('one element from an array', () => {
            const select = selectRandom(mockArray);

            it('returns the element', () => {
                expect(mockArray.includes(select)).toBe(true);
            });
        });

        describe('multiple elements from an array', () => {
            it('returns an new array', () => {
                const select = selectRandom(mockArray, 3);

                expect(select.length).toBe(3);
                expect(Array.isArray(select)).toBe(true);
            });

            it('selects two random elements', () => {
                const select = selectRandom(mockArray, 2);
                const [ first, second ] = select;

                expect(select.length).toBe(2);
                expect(mockArray.includes(first)).toBe(true);
                expect(mockArray.includes(second)).toBe(true);
            });
        });
    });
});
