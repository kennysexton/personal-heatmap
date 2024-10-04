# Generate a personal heatmap

![Heatmap Sample](/public/Sample%20Heatmap.PNG)
I have owned a smart watch for a while and use it to record my runs. I figure it would be pretty cool to see a personalized heatmap of where I run the most.


## How to get activity data

Garmin connect has no bulk export option, but Strava does!

> Bulk Export  
As of May 25th, 2018, Strava provides the option to export an archive of your account.  
Your data archive will include the following:  
A zipped folder with all of your activities in their original file format.


## Requirements

- Python installed locally

- A Strava Account


## Getting started

You can clone this project to generate your own personal heatmap.

1.) [Bulk download your strava data](https://support.strava.com/hc/en-us/articles/216918437-Exporting-your-Data-and-Bulk-Export#h_01GG58HC4F1BGQ9PQZZVANN6WF). Once downloaded, unzip `strava bulk export.zip`

2.) move the contents of `strava bulk export/activites` into the projects `activities/` directory

3.) Some activities may need to be unzipped [instructions for file types](#file-types)

4.) Pip install required packages

`pip install gpxpy`

`pip install geojson`

`pip install fitparse`

5.) Before you will see any heatmaps you need to convert these activites to `.geojson` and combine them

6.) This can be done from the UI by running an instance of the express server

7.) Start the express server running the command `node express/expressServer.js`

8.) In another terminal run `npm run dev` to run the website on your localhost


## File Types

There are various activity types. In my case I have `.fit` `.gpx` and `.tcx`

*Some of the files may be gzipped.*  
```
// unzip all .gz 
gunzip *.gz
```

> [!NOTE]
> If some of the .fit files are failing conversion. It may be because they should have been named `.fit.gz` but are named `.fit` in the export. Renaming those files and unzipping should fix the issue.


## Optimizations

Depending on how many data points are being drawn, the browser may kill a memory heavy tab. Here are some optimizations:

- Reduce the coordinate precision to 5 decimal points [GeoJSON Minify](https://open-innovations.github.io/geojson-minify/) (very minior loss in accuracy)
- Reduce the timeframe to not include all activites