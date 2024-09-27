# Generate a personal heatmap

I have owned a smart watch for a while and use it to record my runs. So naturally I figure it would be pretty cool to see a personalized heatmap of where I run the most.

## How to get activity data

Garmin connect has no bulk export option, but Strava does!

> Bulk Export  
As of May 25th, 2018, Strava provides the option to export an archive of your account.  
<br> 
Your data archive will include the following:  
A zipped folder with all of your activities in their original file format.


## File Types

There are various activity types. In my case I have `.fit` `.gpx` and `.tcx`

*Some of the files may be gzipped. Here is how you address that*

```
// Get the count of files in the folder
ls -l . | egrep -c '^-'

// unzip all .gz 
gunzip *.gz

// Should see the same number of files as before
ls -l . | egrep -c '^-'
```


## Convert all to .geojson for use in heatmap
`pip install gpxpy`
`pip install geojson`

then run

`python gpx_to_geojson.py`