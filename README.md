# Generate a personal heatmap

![Heatmap Sample](/public/Sample%20Heatmap.PNG)
I have owned a smart watch for a while and use it to record my runs. So naturally I figure it would be pretty cool to see a personalized heatmap of where I run the most.


## How to get activity data

Garmin connect has no bulk export option, but Strava does!

> Bulk Export  
As of May 25th, 2018, Strava provides the option to export an archive of your account.  
Your data archive will include the following:  
A zipped folder with all of your activities in their original file format.


## File Types

There are various activity types. In my case I have `.fit` `.gpx` and `.tcx`

*Some of the files may be gzipped.*  
```
// unzip all .gz 
gunzip *.gz
```



## Convert all to .geojson for use in heatmap
`pip install gpxpy`

`pip install geojson`

then run

`python gpx_to_geojson.py`

## Optimizations

Depending on how many data points are being drawn, the browser may kill a memory heavy tab. Here are some optimizations:

- Reduce the coordinate precision to 5 decimal points [GeoJSON Minify](https://open-innovations.github.io/geojson-minify/)