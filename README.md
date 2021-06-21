# cb-final
A web app to display apartment listings on Kijiji. 
- single-page app: no click-through required to view apartment data, location on map, or photos
- more powerful filters: search by move-in date, draw areas of interest on map

The data is provided by a scraper I wrote in Python last year with the [requests](https://pypi.org/project/requests/) and [html](https://docs.python.org/3/library/html.html) libraries.

This README is under construction! This MVP was completed in less than two weeks as my final project for the Concordia Web Dev Bootcamp, so bear with me while I clean up the repo :)

# GIFs and pictures
Early test of the geographical filter interface: client successfully translates each selected map subdivision to the coordinates of its center.
![Map grid test](https://github.com/omarbenmegdoul/cb-final/blob/main/mapgrid%20proof.gif?raw=true)

Next up, the listing display components. I wanted to display all the available information on one page without requiring too much vertical scrolling. 
![Listing component showcase](https://github.com/omarbenmegdoul/cb-final/blob/main/listing%20animation.gif?raw=true)

The search works!
![Search showcase](https://github.com/omarbenmegdoul/cb-final/blob/main/search%20filters.gif?raw=true)

This screenshot shows the map interface overlaid with the listings it returns. The server successfully filters out listings if they're too far away from the selection.
![alt text](https://github.com/omarbenmegdoul/cb-final/blob/main/proof2.png?raw=true)


# To do in order
- clean kludgy/spaghetti code, break big components into subcomponents
- fix client-side non-geo filter validation bugs
- jump to results after fetch
- UI should handle 0 results better
- implement lazy-loading for biggest assets
- deploy!
- duplicate listing detection and removal
- add ability to pin assets in the full display sidebar
- get public transit data for metro station-centered search
- right-click to erase selection on map
- persist user search parameters across sessions
- togglable map overlays
  - listing density heatmap
  - price heatmap
  - vector transit map
  - walkscore, bikescore?
- endpoint to accept new listing data for admin use
- star/hide listings; to-do list functionality?
- is it more performant to fetch all results and filter them on client-side for immediate feedback after filters have been changed, or is it better to do a new fetch everytime and let mongoDB match to listings that pass the criteria?
