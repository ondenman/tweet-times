'use strict'

const searchStrings = [
	'clinton', 
	'trump',
	'sanders'
]

const obj = {
	searchStrings: searchStrings
}

searchStrings.forEach( i => {
	obj[i] = []
})

module.exports = obj