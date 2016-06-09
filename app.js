'use strict'

const Twitter = require('node-twitter');
const fs = require('fs')
 
let twitterStreamClient = new Twitter.StreamClient(
    'XEjQIeiiXHAZfgwb2110gYFOs',
    'kaE9WxUKQN3bilZM4G1OZSKHSA2a5Ril835ZAz4YHikbm74eei',
    '1478253529-CDeEt0xJXBbwu3Ddl61PJY2ZHX7AcjgJvHHmPdT',
    'uAEmJv59QsEQCcw9QdjUHAKCFo0u6vmtmyx0xS0sblzHE'
);

let trumpArr = []
let clintonArr = []
let started = Date.now()
 
twitterStreamClient.on('close', function() {
    console.log('Connection closed.');
});
twitterStreamClient.on('end', function() {
    console.log('End of Line.');
});
twitterStreamClient.on('error', function(error) {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
});

twitterStreamClient.on('tweet', function(tweet) {
    let text = tweet.text.toLowerCase()
    if (text.indexOf('trump') > -1) trumpArr.push(tweet.created_at)
    if (text.indexOf('clinton') > -1 ) clintonArr.push(tweet.created_at)
});

function main() {
    twitterStreamClient.start(['trump','clinton']);
    setTimeout(() => {
        twitterStreamClient.stop()
        let stopped = Date.now()
        let obj = {
            started: started,
            stopped: stopped,
            trump: trumpArr,
            clinton: clintonArr
        }
        fs.writeFileSync('./tweet_times.txt', JSON.stringify(obj, null, 3))
    }, 5000)
}

main()
