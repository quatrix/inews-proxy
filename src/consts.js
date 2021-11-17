const connectURL = (host) => `http://${host}/inewswebservice/services/inewssystem?wsdl`
const connectBody = (serverName) => `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><Connect xmlns="http://avid.com/inewssystem/types"><Username>avid</Username><Password>inews</Password><Servername>${serverName}</Servername></Connect></soap:Body></soap:Envelope>`

const setQueueURL = '/inewswebservice/services/inewsqueue?wsdl'
const setQueueBody (queueFullName) => `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SetCurrentQueue xmlns="http://avid.com/inewsqueue/types"><QueueFullName>${queueFullName}</QueueFullName></SetCurrentQueue></soap:Body></soap:Envelope>`
                  
const getStoriesURL = '/inewswebservice/services/inewsqueue?wsdl'
const getStoriesBody = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><GetStories xmlns="http://avid.com/inewsqueue/types"><NumberOfStoriesToGet>255</NumberOfStoriesToGet><IsStoryBodyIncluded>true</IsStoryBodyIncluded><Navigation>NEXT</Navigation></GetStories></soap:Body></soap:Envelope>`

module.exports = {
  connectURL,
  connectBody,
  setQueueURL,
  setQueueBody,
  getStoriesURL,
  getStoriesBody,
}
