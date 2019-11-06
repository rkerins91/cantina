
const select = (selector, data) => {

  //check for type of selector, assigning result for appropriate selectorType
  let result = []
  if (selector[0] === '.') {
    result = parse(data, selector.slice(1), 'classNames')
  } else if (selector[0] === '/') {
    result = parse(data, selector.slice(1), 'identifier')
  } else {
    result = parse(data, selector, 'class')
  }
  return result
}

const parse = (data, selectorName, selectorType) => {

  let result = []
  // check if match is found, first checking if prop exists, then if it's className
  const matchFound = data[selectorType] &&
    selectorType === 'classNames' ?
    data[selectorType].includes(selectorName) :
    data[selectorType] === selectorName
  // push data to result
  if (matchFound) {
    result.push(data)
  }
  // if data has control and control object has selectorType prop equal to name
  if (data.control && data.control[selectorType] === selectorName) {
    result.push(data.control)
  }
  // if data is an array, loop through array recursively calling parse on each element
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      result = result.concat(parse(data[i], selectorName, selectorType))
    }
  }
  // if data has subviews, loop through subviews array recursively calling parse on each element
  if (data.subviews) {
    for (let i = 0; i < data.subviews.length; i++) {
      result = result.concat(parse(data.subviews[i], selectorName, selectorType))
    }
  }
  // if data has contentView, loop through all properties recursively calling parse on each key
  if (data.contentView) {
    for (let key in data.contentView) {
      result = result.concat(parse(data.contentView[key], selectorName, selectorType))
    }
  }


  return result

}

module.exports = select