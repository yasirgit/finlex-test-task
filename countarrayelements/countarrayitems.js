const flattenNestedArray = require('./flattennestedarray');

function countArrayItems(givenArray) {
    return flattenNestedArray(givenArray).length;
}

module.exports = countArrayItems;