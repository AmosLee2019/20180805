var express = require("express");
var app = express();


// process.on("uncaughtException", function (err) {
//     console.log(err.stack);
// });

app.get('/test/:msg', function (req, res) {
    var json = req.param("msg");
    var jsonVal = JSON.parse(json);
    res.send(jsonVal);
});

try {
    var a = "";
    a.hello();
}
catch(e)
{

}

app.listen(3000);