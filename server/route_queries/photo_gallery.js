var QueryHelper = require('../queries/queryHelper.js');
var QueryUrls = require('../route_queries/query_url.js');

function getAllPhotosGallary(callback) {
    QueryHelper.executeQuery(QueryUrls.getAllPhotosGallery, (error, result) => {
        if (error) {
            console.log("inside error" + error);
            callback(error, null)
        } else {
            console.log("inside results" + result.length);
            var final = { "responsecode": 200, "count": result.length, "result": JSON.parse(JSON.stringify(result)) };
            callback(null, final);
        }
    });
};

function getFirstLookPhotosGallery(callback) {
    QueryHelper.executeQuery(QueryUrls.getFirstLookPhotosGallery, (error, result) => {
        if (error) {
            console.log("inside error" + error);
            callback(error, null)
        } else {
            console.log("inside results" + result.length);
            var final = { "responsecode": 200, "count": result.length, "result": JSON.parse(JSON.stringify(result)) };
            callback(null, final);
        }
    });
};

function getAllPhotoCategories(callback){
    QueryHelper.executeQuery(QueryUrls.getAllPhotoCategories, (error, result) => {
        if (error) {
            console.log("inside error" + error);
            callback(error, null)
        } else {
            console.log("inside results" + result.length);
            var final = { "responsecode": 200, "count": result.length, "result": JSON.parse(JSON.stringify(result)) };
            callback(null, final);
        }
    });
}

module.exports = {
    getAllPhotosGallary,
    getFirstLookPhotosGallery,
    getAllPhotoCategories
};


