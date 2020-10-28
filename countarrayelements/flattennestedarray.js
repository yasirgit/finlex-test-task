function flattenNestedArray(givenArray) {
  var flattenedArray = [];
  for (var i = 0; i < givenArray.length; i++) {
    if (Array.isArray(givenArray[i])) {
      flattenedArray = flattenedArray.concat(flattenNestedArray(givenArray[i]));
    } else {
      flattenedArray.push(givenArray[i]);
    }
  }
  return flattenedArray;
}

module.exports = flattenNestedArray;