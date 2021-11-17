const fs = require('fs')

const {INews} = require('./inews.js')

async function main() {
  const config = JSON.parse(fs.readFileSync('../config.json'))
  const inews = new INews(config)

  await inews.connect()
}


main()
