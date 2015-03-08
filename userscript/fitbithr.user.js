// ==UserScript==
// @name          Fitbit Heart Rate Exporter
// @namespace     localhost
// @version       0.0.1
// @require       http://code.jquery.com/jquery-1.11.2.min.js
// @include       https://www.fitbit.com/activities/exercise/*
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function() {
    var scriptData = $('#scripts').html();
    var hrData = scriptData.match(/\{"duration":[0-9]+,"value":([3-9][0-9]|[1-2][0-9]{2})}/g).map(function(hr) {
        return hr.replace(/duration/g, "d").replace(/value/g, "v").replace(/000,/g, ",")
    });
    var json = '{"h":[' + hrData.join(",") + ']}';
    $('.chart-sections .sections').append('<section class="chart-section"><div><h2>Copy to clipboard</h2><textarea class="info">' + json + '</textarea></div></section>');
    //window.prompt("Copy to clipboard", json)
});
