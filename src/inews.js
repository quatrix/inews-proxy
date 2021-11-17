var axios = require('axios')
var consts = require('./consts')

function getCookie(res) {
  // are you sure it's the best way to get the cookie?
  return res.headers["set-cookie"][0].slice(0,cookie.indexOf(';'))
}

class Inews {
  constructor(config) {
    this.config = config
  }

  async connect() {
    const address = this.config.inewsAddr

    const url = consts.connectURL(address)
    const body = consts.connectBody(address)
    const res = await axios.post(url, body)

    this.cookie = getCookie(res)
  }

  assertConnected() {
    if (!this.cookie) {
      throw('must call connect() before this method')
    }
  }

  async request(path, body) {
    this.assertConnected()

    const host = this.config.webServicesAddr
    const url = `http://${host}${path}`
    return await axios.post(url, body, {'Cookie': this.cookie})
  }

  async setQueue(queueFullName) {
    const body = consts.setQueueBody(queueFullName)
    return await this.request(consts.setQueueURL, body)
  }

  async getLineupNames() {
    const res = await this.request(consts.getStoriesURL, consts.getStoriesBody)
  }
}

