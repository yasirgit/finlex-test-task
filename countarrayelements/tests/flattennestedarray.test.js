const flattenNestedArray = require('../flattennestedarray');

test('flattenNestedArray function exists', () => {
  expect(typeof flattenNestedArray).toEqual('function');
});

test('[1,3,[4,7],5] will return [1, 3, 4, 7, 5]', () => {
  expect(flattenNestedArray([1, 3, [4, 7], 5])).toEqual([1, 3, 4, 7, 5]);
});