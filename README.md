# FITBIT-HR-TO-GPX

Add heart rate data exported from Fitbit activity to GPX-file

## Prerequisite

* Userscript manager such as [Greasemonkey](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/) or [Tampermonkey](https://chrome.google.com/webstore/search/tampermonkey?hl=en)

* [Node](https://nodejs.org/)

## Installation and usage

### Getting heart rate data from Fitbit

Install [userscript](https://github.com/Jschii/fitbit-hr-to-gpx/raw/master/userscript/fitbithr.user.js)
 
Now when viewing activity details on Fitbit site there should be new textarea containing heart rate data in JSON format

![Fitbit activity page](https://raw.githubusercontent.com/Jschii/fitbit-hr-to-gpx/master/tutorial_images/fitbit.png)

Pretty, I know.

Copy the content of that textarea to clipboard and save to a file.

### Adding heart rate data to GPX file

Export the corresponding workout in GPX format (for example in Endomondo that's under more options in workout detail view)

Clone this project

    git clone https://github.com/Jschii/fitbit-hr-to-gpx.git
    
or altenatively just copy files [hr2gpx.js](https://raw.githubusercontent.com/Jschii/fitbit-hr-to-gpx/master/hr2gpx.js) and [package.json](https://raw.githubusercontent.com/Jschii/fitbit-hr-to-gpx/master/package.json)

Update node dependencies

    npm update
    
And now you are good to go
 
    node hr2gpx.js <path-to-hr-json-file> <path-to-gpx-file>
    
If all went well alongside the original gpx-file there should now be a file with same name except for the suffix _hr.gpx

## Warning

As this project web scrapes heart rate data directly from Fibit site, it'll be likely to break in the future when Fitbit changes activity details page.
This is because currently Fitbit doesn't provide API to get heart rate data.

## Misc links

* [How to record an activity wit Fitbit](http://help.fitbit.com/articles/en_US/Help_article/How-do-I-log-or-record-an-activity/)










    






