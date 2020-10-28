const sumOfArrayItems = require('../sumofarrayitems');

test('sumOfArrayItems function exists', () => {
    expect(typeof sumOfArrayItems).toEqual('function');
});

test('[1, [3, 4], 5] will return length 13', () => {
    expect(sumOfArrayItems([1, [3, 4], 5])).toBe(13);
});