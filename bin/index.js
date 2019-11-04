#!/usr/bin/env node
'use strict';
const select = require('./select')
const data = require('./data')

// call select function with argument and assign it to variable selected
const selected = select(process.argv[2], data)


// log values of returned array
selected.forEach((ele, idx) => {
  console.log(`${idx + 1}. ${JSON.stringify(ele, null, 2)}`)
  return
})


// log length of value returned by calling select function with arg
console.log(
  `There are ${selected.length} occcurances that apply to your query`
)