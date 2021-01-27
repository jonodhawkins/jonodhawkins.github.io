---
layout: post_toc
title: TFL Bike Data in Python
excerpt: Playing with TFL Cycling data to create offline animations of hire-bike activity.
thumbnail: /assets/img/2021-01-27/thumbnail.png
---
<img src="/assets/img/2021-01-27/03012020073000_point.gif" alt="Example bike hire activity data from 3/1/20" />

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

```Python
journeyStoreObject = JourneyStore('/path/to/file.csv')
```

and then queried using the `filterStarted` and `filterOngoing` methods, which
return lists of `Journey` objects.  These lists are filtered based on the start
and end date of each journey - to create the moving dots GIFs results, I used
the `filterOngoing` method.  The boolean conditions for this filter isn't
perfect and needs some improvement to work well for longer durations between the
`startDate` and `endDate` arguments.

### The Journey... API

<img src="/assets/img/2021-01-27/03012020073000_point.gif" alt="Example bike hire activity data from 3/1/20" />

## Acknowledgements
Powered by TfL Open Data.\nContains OS data © Crown copyright and database
rights 2016 \nand Geomni UK Map data © and database rights [2019].  Shapefile
data was provided by [Geofunk](https://download.geofabrik.de/europe/great-britain/england/greater-london.html).
