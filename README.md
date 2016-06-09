# tweet-times

Opens a stream of tweets that contain specified terms. Records the times that the tweets were sent. Stores results in a JSON file.

Example:

~~~
{
   "started": "2016-06-09T11:08:38.296Z",
   "stopped": "2016-06-09T11:08:40.316Z",
   "results": {
      "searchStrings": [
         "clinton",
         "trump",
         "sanders"
      ],
      "clinton": [],
      "trump": [
         "Thu Jun 09 11:08:39 +0000 2016"
      ],
      "sanders": []
   }
}
~~~

## Setup

Put credentials in `auth.js`
Enter search terms in `terms.js`

Amend running time and output file constants in app.js:
~~~
    const FILE = './tweet_times.txt'
    const RUNNING_TIME = 1000 * 2 // running time in milliseconds
~~~

