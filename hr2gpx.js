var fs = require('fs');
var xml = require('xmldom');

function usage() {
    console.log("usage: node hr2gpx.js <path to hr-json-file> <path to gpx-file>");
}

function readFiles(pathToHRFile, pathToGPXFile, callback) {
    fs.readFile(pathToHRFile, 'utf8', function (err, hrData) {
        if (err) {
            return console.log(err.message);
        }
        fs.readFile(pathToGPXFile, 'utf8', function (err, gpxData) {
            if (err) {
                return console.log(err.message);
            }
            var newXML = callback(hrData, gpxData);
            fs.writeFile(pathToGPXFile.replace(/\.gpx$/i, '_hr.gpx'), newXML, 'utf8', function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        });
    });
}

function epochFromPoint(point) {
    return new Date(point.getElementsByTagName('time').item(0).firstChild.data).getTime() / 1000;
}

function getClosestHR(hrJson, time) {
    var closest = hrJson[0];
    hrJson.forEach(function (hr) {
        var thisOffset = Math.abs(time - hr.d);
        var closestOffset = Math.abs(time - closest.d);
        if (thisOffset <= closestOffset) {
            closest = hr;
        }
    });
    return closest.v;
}

function doIt(hrData, gpxData) {
    var hrJson = JSON.parse(hrData);

    var doc = new xml.DOMParser().parseFromString(gpxData);
    var points = doc.getElementsByTagName('trkpt');
    var numOfPoints = points.length;

    var startTime = epochFromPoint(points.item(0));

    for (var i = 0; i < numOfPoints; i++) {
        var offset = epochFromPoint(points.item(i)) - startTime;
        var hr = getClosestHR(hrJson.h, offset);

        var extensionsElem = doc.createElement('extensions');
        var tpExtensionElem = doc.createElement('gpxtpx:TrackPointExtension');
        var hrElem = doc.createElement('gpxtpx:hr');
        var hrValue = doc.createTextNode(hr);

        hrElem.appendChild(hrValue);
        tpExtensionElem.appendChild(hrElem);
        extensionsElem.appendChild(tpExtensionElem);
        points.item(i).appendChild(extensionsElem);
    }
    return new xml.XMLSerializer().serializeToString(doc);
}

if (process.argv.length === 4) {
    readFiles(process.argv[2], process.argv[3], doIt);
} else {
    usage();
}