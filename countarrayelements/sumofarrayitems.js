const flattenNestedArray = require('./flattennestedarray');

function sumOfArrayItems(givenArray) {
    return flattenNestedArray(givenArray)
        .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
}

module.exports = sumOfArrayItems;