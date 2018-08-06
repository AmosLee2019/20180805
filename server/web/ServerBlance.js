var UnitTools = require("./../core/UnitTools.js");
var ConsistentHash = require("consistent-hash");
var Config = require("./../core/Config.js");

class ServerBlance {
    constructor() {
        this.hrs = {};
        this.initFromServerConfig();
    }

    static getInstance() {
        if (ServerBlance.g_instance === null) {
            ServerBlance.g_instance = new ServerBlance();
        }
        return ServerBlance.g_instance;
    }

    initFromServerConfig() {
        var config = Config.getServerConfig();
        config = config.serverblance;
        for (var serviceName in config) {
            var ips = config[serviceName];
            for (var index in ips) {
                var ip = ips[index];
                this.addIP(serviceName, ip);
            }
        }
    }

    addIP(serviceName, ip) {
        var serverHash;
        if (UnitTools.isUndefined(this.hrs[serviceName])) {
            serverHash = new ConsistentHash();
            this.hrs[serviceName] = serverHash;
        }

        serverHash = this.hrs[serviceName];
        serverHash.add(ip);
    }

    getIP(serviceName, ip) {
        var hash = this.hrs[serviceName];
        return hash.get(ip);
    }
};

ServerBlance.g_instance = null;


module.exports = ServerBlance;