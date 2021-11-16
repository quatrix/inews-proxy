const configFile = require('./config.json');

const connectMsg = '<?xml version="1.0" encoding="utf-8"?>'+
                  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
                  '<soap:Body><Connect xmlns="http://avid.com/inewssystem/types">' +
                  '<Username>avid</Username><Password>inews</Password><Servername>'
const connectHeader = {
                    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; MS Web Services Client Protocol 2.0.50727.8825)',
                    'Content-Type': 'text/xml; charset=utf-8',
                	  'SOAPAction': '""',
                    'Host':'',                            
                    'Content-Length':'',                 
                    'Connection':'Keep-Alive',
                    'Expect':'100-continue'
                  }
const setQueue =  '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
                  ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body>' +
                  '<SetCurrentQueue xmlns="http://avid.com/inewsqueue/types"><QueueFullName>'
                  

const setQueueHeader = {

                    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; MS Web Services Client Protocol 2.0.50727.8825)',
                    'Content-Type': 'text/xml; charset=utf-8',
                	  'SOAPAction': '""',
                    'Host':"",                     
                    'Content-Length':"",           
                    'Connection':'Keep-Alive',
                    'Expect':'100-continue'
}
const getStoriesMsg = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"'+
                 ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
                 '<soap:Body><GetStories xmlns="http://avid.com/inewsqueue/types"><NumberOfStoriesToGet>255</NumberOfStoriesToGet>'+
                 '<IsStoryBodyIncluded>true</IsStoryBodyIncluded><Navigation>NEXT</Navigation></GetStories></soap:Body></soap:Envelope>'


const getStoriesHeader = {

                    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; MS Web Services Client Protocol 2.0.50727.8825)',
                    'Content-Type': 'text/xml; charset=utf-8',
                	  'SOAPAction': '""',
                    'Host':"",
                    'Content-Length':"",
                    'Connection':'Keep-Alive',
                    'Expect':'100-continue'
};
const disconnectMsg = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
                      ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body>'+
                      '<Disconnect xmlns="http://avid.com/inewssystem/types" /></soap:Body></soap:Envelope>';

module.exports = {
  connectMsg:connectMsg,
  connectHeader:connectHeader,
  configFile:configFile,
  setQueue:setQueue,
  setQueueHeader:setQueueHeader,
  getStoriesMsg:getStoriesMsg,
  getStoriesHeader:getStoriesHeader
}
