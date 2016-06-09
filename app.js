'use strict'

const Twitter = require('node-twitter');
const fs = require('fs')
const auth = require('./auth.js')
const terms = require('./terms.js')
 
let twitterStreamClient = new Twitter.StreamClient(
    auth.CONSUMER_KEY,
    auth.CONSUMER_SECRET,
    auth.TOKEN,
    auth.TOKEN_SECRET
)
 
twitterStreamClient.on('close', function() {
    console.log('Connection closed.')
})

twitterStreamClient.on('end', function() {
    console.log('End of Line.')
})

twitterStreamClient.on('error', function(error) {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message))
})

twitterStreamClient.on('tweet', function(tweet) {
    pushDates(tweet)
})

function pushDates(tweet) {
    let text = tweet.text.toLowerCase().split(' ')
    let keys = Object.keys(terms)
        keys.forEach( key => {
            if (text.includes(key))
                terms[key].push(tweet.created_at)
        })
}

Array.prototype.includes = function(arg) {
    let result = this.indexOf(arg) > -1 ? true : false
    return result
}

function run() {
    console.log('Running')
    console.log('Will terminate at: '+new Date(Date.now()+RUNNING_TIME))

    const runningTime = RUNNING_TIME
    const started = new Date(Date.now())

    twitterStreamClient.start(terms.searchStrings)
    setTimeout(() => {
        twitterStreamClient.stop()
        let stopped = new Date(Date.now())

        let obj = {
            started: started,
            stopped: stopped,
            results: terms
        }
        fs.writeFileSync(FILE, JSON.stringify(obj, null, 3))
    }, runningTime)
}

const FILE = './tweet_times.txt'
const RUNNING_TIME = 1000 * 2 // running time in milliseconds
run()
