
var ServerBlance = require("./ServerBlance.js");
var UnitTools = require("./../core/UnitTools.js");
var express = new require("express")();

express.get("/getHallServiceUrl/:id", function (req, res) {
    var id = req.param("id");
    if (UnitTools.isNullOrUndefined(id)) {
        res.send("获取Url发生错误");
        return;
    }

    var ip = ServerBlance.getInstance().getIP("HallService", id);
    res.send(ip);
});

express.listen(3000);