
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

  const matchFound = data[selectorType] &&
    selectorType === 'classNames' ?
    data[selectorType].includes(selectorName) :
    data[selectorType] === selectorName

  if (matchFound) {
    result.push(data)
  }

  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      result = result.concat(parse(data[i], selectorName, selectorType))
    }
  }

  if (data.subviews) {
    for (let i = 0; i < data.subviews.length; i++) {
      result = result.concat(parse(data.subviews[i], selectorName, selectorType))
    }
  }

  if (data.contentView) {
    for (let key in data.contentView) {
      result = result.concat(parse(data.contentView[key], selectorName, selectorType))
    }
  }

  if (data.control && data.control[selectorType] === selectorName) {
      result = result.concat(parse(data.control, selectorName, selectorType))
  }

  return result

}

module.exports = select