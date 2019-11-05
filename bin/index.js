#!/usr/bin/env node
'use strict';
const select = require('./select')
const multiSelect = require('./multiSelect')
const data = require('./data')


// call select function with argument and assign it to variable selected
const selected = select(process.argv[2], data)

const multi = multiSelect(selected, process.argv.slice(3))
// log values of returned array
multi.forEach((ele, idx) => {
  console.log(`${idx + 1}. ${JSON.stringify(ele, null, 2)}`)
  return
})


// log length of value returned by calling select function with arg
console.log(
  `There are ${multi.length} occcurances that apply to your query`
)