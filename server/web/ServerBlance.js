var ConsistentHash = require("consistent-hash");
var Config = require("./../core/Config.js");
class ServerBlance {
    constructor() {
        this.hrs = {};
    }

    initFromServerConfig() {
        Config.
    }

    addIP(serviceName, ip) {
        var serverHash = new ConsistentHash();
        serverHash.add(ip);
        this.hrs[serviceName] = serverHash;
    }

    getIP(serviceName, ip) {
        var hash = this.hrs[serviceName];
        return hash.get(ip);
    }
};




module.exports = ServerBlance;