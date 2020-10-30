// @ts-check
const flattenNestedArray = require('./flattennestedarray');

/**
 * Calculate sum of all elements
 * @param {Array} givenArray 
 * @returns sum of all elements
 */
function sumOfArrayItems(givenArray) {
    return flattenNestedArray(givenArray)
        .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
}

module.exports = sumOfArrayItems;