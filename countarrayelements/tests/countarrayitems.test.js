const countArrayItems = require('../countarrayitems');

test('countArrayItems function exists', () => {
    expect(typeof countArrayItems).toEqual('function');
});

test('[1,3,5] will return length 3', () => {
    expect(countArrayItems([1, 3, 5])).toBe(3);
});