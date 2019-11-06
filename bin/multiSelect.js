
const multiSelect = (possibleResults, selectors) => {
  // Base case will be that there are no more selectors
  let matchedResults = []
  const selector = selectors[0]
  if (selectors.length === 0) {
    return possibleResults
  }

  // Otherwise we have some new selector to look for a match in our possibleResults array i.e
  // looping through possibleResults and checking appropriate properties for results

  // if classNames has match 
  else if (selector[0] === '.') {
    matchedResults = possibleResults.filter(ele => {
      return ele.classNames.includes(selector.slice(1))
    })
  }

  // if identifier has match 
  else if (selector[0] === '/') {
    matchedResults = possibleResults.filter(ele => {
      return ele.identifier === selector.slice(1)
    })
  }

  // else we have a class selector

  else {
    matchedResults = possibleResults.filter(ele => {
      return ele.identifier === selector
    })
  }

  // Now that matchedResults has been built up from our selector and possibleResults, we can
  // recursively call multiSelect to check the remaining selectors with the new possibleResults
  

  return multiSelect(matchedResults, selectors.slice(1))
  
}

module.exports = multiSelect