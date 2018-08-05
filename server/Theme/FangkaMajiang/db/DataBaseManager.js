var MongooseAsync = require("./../../../core/MongooseAsync.js");
var app = require("./../../../core/App.js").instance;

class DataBaseManager {
    constructor() {

    }

    static instance() {
        if (DataBaseManager.g_Instance == null) {
            DataBaseManager.g_Instance = new DataBaseManager();
        }

        return DataBaseManager.g_Instance;
    }

    async initDb() {
        this.mongooseAsync = new MongooseAsync();
        var config = app.appConfig.database.mongodb;
        var account = config.account;
        var pass = config.pass;
        var ip = config.ip;
        var port = config.port;
        var dbName = config.dbname;

        var isOk = await this.mongooseAsync.connect(account, pass, ip, port, dbName);
        if (isOk)//定义表结构
        {
            //id account pass loginTime createTime score
            this.mongooseAsync.makeModel("userInfo", {
                id: Number, account: Number, pass: String,
                loginTime: Date, createTime: Date, score: Number
            });
            return Promise.resolve(true);
        }
        else//
        {
            return Promise.resolve(false);
        }
    }

    async createPlayer(id, account, pass, score) {
        var userInfoModel = this.mongooseAsync.getModle("userInfo");
        var newPlayer = new userInfoModel();
        newPlayer.id = id;
        newPlayer.account = account;
        newPlayer.pass = pass;
        newPlayer.score = score;
        newPlayer.loginTime = new Date();
        newPlayer.createTime = new Date();
        return await newPlayer.save();
    }

    async findPlayer(account) {
        var userInfoModel = this.mongooseAsync.getModle("userInfo");
        var playerInfo = await userInfoModel.find({account:account});
        return new Promise.resolve(playerInfo);
    }
}

DataBaseManager.g_Instance = null;
module.exports = DataBaseManager;