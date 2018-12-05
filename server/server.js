const config = require('./config/config.js');
console.log(process.env.NAME);
const express = require('express');
const app = express();
const path = require('path');

var QueryHelper = require('./queries/queryHelper.js');
var QueryUrls = require('./route_queries/query_url.js');
var PhotoGallary = require('./route_queries/photo_gallery.js');

var Reverse = require('./route_queries/reverse');


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

app.get('/getallrecords', (request, response) => {
    QueryHelper.executeQuery(QueryUrls.selectQuery, (error, result) => {
        if (error) {
            console.log("error" + error);
            sendBadRequestError({ error: 'cannot fetch rows : ' + error }, response);
        } else {
            console.log(result.length);
            response.send({ "responsecode": 200, "result": result });
            // const used = process.memoryUsage().heapUsed / 1024 / 1024;
            // console.log(`The getAllrecords script uses approximately ${Math.round(used * 100) / 100} MB`);
            const used = process.memoryUsage();
            for (let key in used) {
                console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
            }
        }
    });
});

app.get('/getallphotogallary', async (request, response) => {
    await PhotoGallary.getAllPhotosGallary((error, result) => {
        if (error) {
            console.log("error" + error);
            sendBadRequestError({ error: 'cannot fetch photos : ' + error }, response);
        } else {
            console.log("final response" + result.length);
            response.send(result);
            // const used = process.memoryUsage().heapUsed / 1024 / 1024;
            // console.log(`The getAllPhotoGallary script uses approximately ${Math.round(used * 100) / 100} MB`);
            const used = process.memoryUsage();
            for (let key in used) {
                console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
            }
        }
    });
});

app.get('/getfirstlookphotos', async (request, response) => {
    await PhotoGallary.getFirstLookPhotosGallery((error, result) => {
        if (error) {
            console.log("error" + error);
            sendBadRequestError({ error: 'cannot fetch photos : ' + error }, response);
        } else {
            console.log("final response getFirstLookPhotosGallery" + result.length);
            response.send(result);
        
            const used = process.memoryUsage();
            for (let key in used) {
                console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
            }
        }
    });
});

app.get('/getallphotocategories', async (request, response) => {
    await PhotoGallary.getAllPhotoCategories((error, result) => {
        if (error) {
            console.log("error" + error);
            sendBadRequestError({ error: 'cannot fetch photos : ' + error }, response);
        } else {
            console.log("final response getFirstLookPhotosGallery" + result.length);
            response.send(result);
        
            const used = process.memoryUsage();
            for (let key in used) {
                console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
            }
        }
    });
});

/************************************************************ Error Handlers ********************************************************/

var sendBadRequestError = (error, response) => {
    response.status(400)
        .send(error);
};
