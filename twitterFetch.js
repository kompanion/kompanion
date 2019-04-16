const fs = require('fs')
const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: '0iR5YXuEaMl4KAGab75tz1cpy',
  consumer_secret: 'bx3L3uF8K2mTEbb4ttnwTsYkDQdLMtpGGvdVEnO2e4XxZgoy5K',
  access_token_key: '1019636109637226496-sa6HcpI3zs70TKAdlMdaqfSMnEV3ea',
  access_token_secret: 'tgfmn9apg4lo5wev0Q0ixdGW0YC3bil1SBNri6awzNxbZ'
})

const USER = 'ryanflorence'
''
const params = {
  count: 200,
  screen_name: USER,
  include_rts: false
}

console.log(params)
// const params = {
//   q: '#gatsbytutorial',
//   count: 2,
//   result_type: 'recent',
//   lang: 'en'
// }

const dealWithData = (err, data, res) => {
  if (!err) {
    const formattedStatus = data.map(
      ({ created_at, favorite_count, retweet_count, text, entities }) => {
        const tweetUrl = entities.urls[0] && entities.urls[0].url
        const mentionedPeople = entities.user_mentions.map(m => m.screen_name)
        return {
          favorite_count,
          retweet_count,
          text,
          created_at,
          tweetUrl,
          mentionedPeople
        }
      }
    )
    const filteredStatus = formattedStatus
      .filter(s => {
        if (
          s.retweet_count < 1 ||
          s.favorite_count < 10 ||
          s.tweetUrl === undefined
        ) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        const getIndex = ({ retweet_count, favorite_count }) =>
          retweet_count * 10 + favorite_count
        return getIndex(a) > getIndex(b) ? -1 : 1
      })
    // for (const status of data) {
    //   const { favorite_count, } = status;
    // }
    fs.writeFile(
      `./tweets/${USER}-filtered.json`,
      JSON.stringify(filteredStatus, null, 2),
      'utf8',
      err => console.error(err)
    )
    // console.log(data)
    // for (const status of data.statuses) {
    //   console.log(status.user)
    // }
  } else {
    console.log('ERRO', err)
  }
}

client.get('statuses/user_timeline', params, dealWithData)
