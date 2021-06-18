# cb-final

# To do
- remove kludges
- fix client-side non-geo filter validation bugs
- implement lazy-loading for biggest assets
- pin assets in the full display sidebar
- get public transit data
- right-click the erase selection on map
- persist user searches across visits
- togglable map overlays
  - listing density heatmap
  - price heatmap
  - vector transit map
  - walkscore, bikescore?
- endpoint to accept new listing data for admin use
- star/hide listings; to-do list functionality?
- is it more performant to fetch all results and filter them on client-side for immediate feedback after filters have been changed, or is it better to do a new fetch everytime and let mongoDB match to listings that pass the criteria?
