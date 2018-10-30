const config = require('./config/config.js');
console.log(process.env.NAME);
const express = require('express');
const app = express();
const path = require('path');

var QueryHelper = require('./queries/queryHelper.js');


var serverPort = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, 'public')));

app.listen(serverPort, () => {
    console.log(`server is listening at port ${serverPort}`);
});

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/help', (req, res) => {
    res.redirect('help.html');
});

app.get('/getAllrecords', (request, response) => {
    var selectQuery = "select * from bh_author_post_detail limit 10";
    QueryHelper.executeQuery(selectQuery, (error, result) => {
        if (error) {
            console.log("error" + error);
            sendBadRequestError({ error: 'cannot fetch rows : ' + error }, response)
        } else {
            console.log(result.length);
            response.send({"responsecode":200,"result":result});
        }
    });
});

/************************************************************ Error Handlers ********************************************************/

var sendBadRequestError = (error, response) => {
    response.status(400)
        .send(error);
};
var sendBadRequestErrorReloadPage = (error, response) => {
    alert(response.error);
    response.status(400)
    .send(response.url);
};
var sendInternalServerError = (error, response) => {
    response.status(500)
        .send(error);
};

var sendFileNotFoundError = (error, response) => {
    response.status(404)
        .send(error);
};
