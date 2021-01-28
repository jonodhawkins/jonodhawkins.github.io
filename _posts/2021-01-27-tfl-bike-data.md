---
layout: post_toc
title: TFL Bike Data in Python
excerpt: Playing with TFL Cycling data to create offline animations of hire-bike activity.
thumbnail: /assets/img/2021-01-27/thumbnail.png
---
<img src="/assets/img/2021-01-27/03012020073000_point.gif" alt="Example bike hire activity data from 3/1/20" />

**This is a work in progress!**

Back as an undergrad, we were set an assignment for out Introduction to
Programming course to develop a UI in Python that displayed some open access
data in a 'user-friendly' way.  I had recently come across the [TfL Open Data
API](https://tfl.gov.uk/info-for/open-data-users/) and used the Barclay Bicycle
hire data to create an animation of where bikes were moving across London over
a period of a few days.

The results were pretty trivial because the data only provided start and end
points for each journey, so the map showed a series of lines that appeared and
disappeared as a bicycle was "on the move".  At the time I thought it would be
nice to extend this to show the actual route of the bicycle but never got round
to it.

Recently, I've returned to the problem in a bid to re-familiarise myself with
Python and matplotlib to prepare for the eventuality that I lose my MATLAB
license and still need to knock up scripts for data analysis.

**Source code for the project can be found under the [TFLBikeViewer](https://github.com/jonodhawkins/TFLBikeViewer)
repository on my GitHub**.

## The Data
The data for this project can be found [here](https://cycling.data.tfl.gov.uk/)
in the form of CSV files from the TFL Cycling Data repository.  There is a range
of data available here, but I'm interested in the `usage-stats` datasets.  These
can be downloaded manually or a listing (`cycling-load.json`) is provided if you
wanted to automate multiple downloads.  The contents of the CSV files are in the
following format:

```
Rental Id,Duration,Bike Id,End Date,EndStation Id,EndStation Name,Start Date,StartStation Id,StartStation Name
94113398,960,6800,07/01/2020 14:07,541,"Green Park Station, Mayfair",07/01/2020 13:51,164,"Cleveland Gardens, Bayswater"
94117049,600,8691,07/01/2020 17:06,48,"Godliman Street, St. Paul's",07/01/2020 16:56,323,"Clifton Street, Shoreditch"
94110497,540,531,07/01/2020 11:01,654,"Ashmole Estate, Oval",07/01/2020 10:52,624,"Courland Grove, Wandsworth Road"
... etc ...
```

So no change there - data is still only provided for the start and end
locations of each bike journey, as well as timing information and some
identifying data of each bike.  Rather than use the name data provided, the
`BikePointStore` class is used to query the [BikePoint](https://api-portal.tfl.gov.uk/api-details#api=BikePoint)
TFL API to find an unambiguous **latitude**, **longitude** position for each
bike rental point.  This stores the positional and name data for each bike point
in a Python dictionary which can be queried by the `id` field provided in the
CSV data.

It's worth noting here that - for some reason - TFL prefixes these IDs
with the string `BikePoint_` so that needs to be stripped from the data provided
by the BikePoint API...

### Picking and Choosing
The `JourneyStore` class is used to store the interpreted CSV files in memory.
It can be instantiated as

```python
journeyStoreObject = JourneyStore('/path/to/file.csv')
```

and then queried using the `filterStarted` and `filterOngoing` methods, which
return lists of `Journey` objects.  These lists are filtered based on the start
and end date of each journey - to create the moving dots GIFs results, I used
the `filterOngoing` method.  The boolean conditions for this filter isn't
perfect and needs some improvement to work well for longer durations between the
`startDate` and `endDate` arguments.

### The Journey ... API
The TfL [Journey](https://api-portal.tfl.gov.uk/api-details#api=Journey) API is
used to find the route between each bike point.  The required inputs to the API
are the `from` and `to` locations, however to limit this to routes the `mode`
parameter is used to specify cycling as the mode of transport.  There was a
strange bug where some point to point journeys returned a
`NullReferenceException`, but this seemed to be resolved by passing the
`cyclePreference` parameter with the value `cycleHire`.  

Requests are made from the `RouteStore` class using the `getRoute(startIdx, endIdx)`
method. At present, the first (0<sup>th</sup>) journey is always chosen to be
saved, however there is potential to expand for random journeys if multiple
options exist between the start and end point (i.e. based on different travel
times).  The latitude and longitude from each `step` for each `leg` are then
appended to a list to store the stop locations for each journey.

```python
# Import TFLBikeData library
import tflbikedata
# Load any available route data from the local file
routeStore = tflbikedata.RouteStore('/path/to/routestorefile.pkl')
# Display how many routes have been loaded from the file
print('Loaded', rStore.numRoutes,'routes')
# Get the route data as two equidimensional arrays containing the latitude and
# longitudinal data
startIdx = 419  # example start ID
endIdx = 677    # example end ID
lat, lon = routeStore.getRoute(startIdx, endIdx)
# If the route from startIdx to endIdx hasn't been fetched before then save it
# locally to prevent future HTTP requests (uses Pickle internally).
routeStore.save()
```

The **time taken for each request to the API was in the order of 1-2 seconds**
which makes it infeasible to perform these on-the-fly.  The `RouteStore` object
is used to store these locations into a local file which can be used to speed
up the plotting process later on.  At the moment this is fairly trivial, relying
on a multilayered Python `dict`, where indices are the bike point IDs and values
are tuples containing latitude and longitude pairs.  This is saved using the
[Pickle](https://docs.python.org/3/library/pickle.html) library to a local file.

<img src="/assets/img/2021-01-27/03012020083000_point.gif" alt="Example bike hire activity data from 3/1/20" />

### Where am I?
In order to map where each bike is at a given time, the total distance of each
`Journey` is computed when it is loaded from the `JourneyStore`.  This is a
**proxy measure** because it is computed directly on the difference in the
longitude and latitude coordinates but because the maximum distance between
stops is small, we can apply the small angle approximation.

It is necessary to make the assumption that the cyclist is travelling at a
constant speed from the duration of their journey because of lack of available
data.  To find the location of the bike at a datetime `time`, the 'time after
'leaving' is computed and converted to a fractional "duration" by dividing
through saved journey duration.

```python
# journey is a Journey object, .startDate is a datetime, time is a datetime
timeAfterLeaving = time - journey.startDate
# Convert to a fractional duration
fractDuration = timeAfterLeaving / journey.duration
```

Then, iterating over the legs of the journey made up by consecutive lat-long
pairs, the fractional distance cumulative distance at that leg with respect to
the total distance of the trip can be calculated.  If this exceeds the
fractional duration calculated earlier, then we must be somewhere in this leg
(because we use the cumulative distance including the current leg).  If that is
the case, we find the fractional distance along the current leg (or
`subFractDistance`) and use this to project out lat-long position.

```python
# Iterate over individual legs
idx = 0
prevDistance = 0
while idx < len(self.distance):
    # Check whether we are in the current leg
    cFractDistance = (prevDistance+self.distance[idx])/self.totalDistance

    if cFractDistance >= fractDuration:
        if self.distance[idx] == 0:
            subFractDistance = 0;
        else:
            subFractDistance = (  fractDuration * self.totalDistance
                            - prevDistance) / (self.distance[idx])
        # Calculate offset
        lat =   self.lat[idx] + (self.lat[idx+1] - self.lat[idx]) \
                              * subFractDistance
        lon =   self.lon[idx] + (self.lon[idx+1] - self.lon[idx]) \
                              * subFractDistance
        return lat, lon
```

## Putting it Together
All of this comes together (with a bit of additional matplotlib and shapefile
trickery found in BackgroundMapPlotter) in the file `testbench/TB_MovingDots.py`
to produce time series of TfL cycle hire movements over time.  Specifying a
`startDate`, `endDate` and interval - as well as loading the correct data file -
allows for the generation of the animated GIFs seen throughout this article.

<img src="/assets/img/2021-01-27/07092020163000_point.gif" alt="Example bike hire activity data from 7/10/20" />

There's still quite a lot of work I'd like to do on analysing the bike data
itself and hopefully the `RouteStore` object can add a layer of depth to this
analysis.  For example, comparing the frequency of journey durations and their
(approximate, TfL suggested) route length, might be used to indicate which bike
points are hotspots for 'sightseeing' trips, where the journey duration is
significantly longer than the 'approximate' travelled distance.  Even analysis
of the raw data itself should prove interesting in looking at seasonal
variability in bike station use and identifying public events etc.

## Acknowledgements
Powered by TfL Open Data.Contains OS data © Crown copyright and database
rights 2016 and Geomni UK Map data © and database rights [2019].  Shapefile
data was provided by [Geofunk](https://download.geofabrik.de/europe/great-britain/england/greater-london.html).
