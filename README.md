# inews-proxy
This is my first upload to github - this project actually is clone copy of an working process, that will be updated from time to time to github.

The general concept of inews proxy project - is to simplify comlpex and hard avid inews wsapi (SOAP based API protocol) to simple gateway that will provide to the clients parsed, JSON-formatted lineups information.

Main file called axios.js, which have INEWS class with 3 methods - connect(), setQueue(), and getlineupNames().
All the static data, like html headers, SOAP messages and inews and WSAPI servers adresses we get from rawDataModule who have that const,  and alo external config.json file that converted to js object - that includes user data. 
