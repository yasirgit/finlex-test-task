// @ts-check
const flattenNestedArray = require('./flattennestedarray');

/**
 * Count array elements
 * @param {Array} givenArray
 * @returns Length of the given array  
 */
function countArrayItems(givenArray) {
    return flattenNestedArray(givenArray).length;
}

module.exports = countArrayItems;