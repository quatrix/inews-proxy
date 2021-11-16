var axios = require('axios');
var rawDataModule = require('./rawDataModule')//Soap Messages, headers, external user data library

class Inews {
  
  constructor(raw) {
      this.raw = raw;
      this.lineupCount = 0;
      this.wsAddr = raw.configFile.webServicesAddr;
      this.inewsAddr = raw.configFile.inewsAddr;
      this.cookie = "";
      
    }
  connect() {
      this.connectMsg = this.raw.connectMsg + this.inewsAddr + '</Servername></Connect></soap:Body></soap:Envelope>'; // adds to message inewsAddr
      this.connectHeader = this.raw.connectHeader;
      this.connectHeader['Host'] = this.wsAddr;
      this.connectHeader['Content-Length'] = this.connectMsg.length;
    axios.post('http://' + this.wsAddr + '/inewswebservice/services/inewssystem?wsdl', this.connectMsg, {headers:this.connectHeader})
        .then((res) => {
          var cookie = res.headers["set-cookie"][0]
          this.cookie = cookie.slice(0,cookie.indexOf(';'))
          console.log('Connected to INEWS with token: ' + cookie.slice(0,cookie.indexOf(';')) + '. Starting the MainLoop proccess')
          this.setQueue()
        }).catch((err) => {
          if(err.errno == -4078){console.log('ERROR: Inews webservices at ' + this.wsAddr + ' is down, or wrong address (check config.json file)')} else {console.error(err)}
        });
  }
  setQueue() {
    this.setQueueMsg = this.raw.setQueue + this.raw.configFile.Lineup[this.lineupCount] + '</QueueFullName></SetCurrentQueue></soap:Body></soap:Envelope>'
    this.queueHeader = this.raw.setQueueHeader    
    this.queueHeader['Host'] = this.wsAddr
    this.queueHeader['Content-Length'] = this.setQueueMsg.length
    this.queueHeader['Cookie'] = this.cookie
    
    axios.post('http://' + this.wsAddr + '/inewswebservice/services/inewsqueue?wsdl', this.setQueueMsg, {headers:this.queueHeader})
        
        .then((res) => {
          
          if(this.lineupCount+1 < this.raw.configFile.Lineup.length){
            this.lineupCount++
            this.getLineupNames()
          }
        
        }).catch((err) => {
            //handle wrong lineupname Error
            if (err.response.data.indexOf('<faultstring>Could not find:') != -1){
              console.log('Error:' + err.response.data.slice(err.response.data.indexOf('<faultstring>')+13,err.response.data.indexOf('</faultstring>')) + ', SKIPPING.');     
              if(this.lineupCount+1 < this.raw.configFile.Lineup.length){
                this.lineupCount++
                this.setQueue()
              }
            }
        });
  }
  getLineupNames() {
    this.getStoriesMsg = this.raw.getStoriesMsg
    this.getStoriesHeader = this.raw.getStoriesHeader
    this.getStoriesHeader['Host'] = this.wsAddr
    this.getStoriesHeader['Content-Length'] = this.getStoriesMsg.length
    this.getStoriesHeader['Cookie'] = this.cookie
    axios.post('http://' + this.wsAddr + '/inewswebservice/services/inewsqueue?wsdl', this.getStoriesMsg, {headers:this.getStoriesHeader})
        .then((res) => {
          //console.log('For getNames: ' + res.data)
          console.log('GOT LINEUP DATA FOR: ' + this.raw.configFile.Lineup[this.lineupCount-1] )
          this.setQueue()
        }).catch((err) => {
            console.error(err);
        });
  }
 
}

var INEWS = new Inews(rawDataModule)

INEWS.connect()


































//connect()
/*
function nextLineup(){
  if(count < rawDataModule.configFile.Lineup.length){
    count++
    setQueue()
  } else {
  count = 0
  setQueue()
  }
}

function connect(){

axios.post('http://' + rawDataModule.configFile.webServicesAddr + '/inewswebservice/services/inewssystem?wsdl', rawDataModule.connectMsg, {headers:rawDataModule.connectHeader})
    .then((res) => {
      var cookie = res.headers["set-cookie"][0]
      rawDataModule.setQueueHeader.Cookie = cookie.slice(0,cookie.indexOf(';'))
      rawDataModule.getStoriesHeader.Cookie = cookie.slice(0,cookie.indexOf(';'))
      console.log('Connected to INEWS with token: ' + cookie.slice(0,cookie.indexOf(';')) + '. Starting the MainLoop proccess')
      setQueue()
    }).catch((err) => {
      if(err.errno == -4078){console.log('ERROR: Inews webservices at ' + rawDataModule.configFile.webServicesAddr + ' is down, or wrong address (check config.json file)')} else {console.error(err)}

    });
}

function setQueue(){
  var dataToPost = rawDataModule.setQueue.A + rawDataModule.configFile.Lineup[count] +rawDataModule.setQueue.B;
  axios.post('http://' + rawDataModule.configFile.webServicesAddr + '/inewswebservice/services/inewsqueue?wsdl', dataToPost, {headers:rawDataModule.setQueueHeader})
      .then((res) => {
        //console.log('For setQueue: ' + res.data)
        console.log(count)

        getLineupNames()
      }).catch((err) => {
          //handle wrong lineupname Error
          if (err.response.data.indexOf('<faultstring>Could not find:') != -1){
            console.log('Error:' + err.response.data.slice(err.response.data.indexOf('<faultstring>')+13,err.response.data.indexOf('</faultstring>')) + ', SKIPPING.');
            nextLineup()
          }
      });

}

function getLineupNames(){

  axios.post('http://' + rawDataModule.configFile.webServicesAddr + '/inewswebservice/services/inewsqueue?wsdl', rawDataModule.getStoriesCMD, {headers:rawDataModule.getStoriesHeader})
      .then((res) => {
        //console.log('For getNames: ' + res.data)
        console.log('GOT LINEUP DATA!!!')
        nextLineup()

      }).catch((err) => {
          console.error(err);
      });

}
*/
