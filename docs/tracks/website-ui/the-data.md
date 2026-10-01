# The Data

RideScore DC publishes two artifacts: a **data package** (Parquet files, the road network and safety scores) and a **serving bundle** (SQL, deciding what a map on the website may show). `npm run data` downloads both and loads them into your local database; the [Full Stack Developer Guide](/tracks/website-ui/full-stack-guide) covers the loading commands.

The currently published data set that is shown on the website comes from public Open Data DC: the [roadway block](https://opendata.dc.gov/datasets/DCGIS::roadway-block/about) network, [crash records](https://opendata.dc.gov/datasets/crashes-in-dc/about), and the Washington DC boundary.

## The three datasets

| Dataset | Rows | One row is |
|---|---|---|
| `road_segment` | 13,829 | one block of road, with attributes and geometry |
| `crashes` | 2,224 | one crash that injured or killed a cyclist, positioned |
| `ridescore_v1_scores` | 13,829 | the safety score and its components for one block |

### `road_segment`

| Column | Meaning |
|---|---|
| `segment_id` | the block's durable identity (DDOT `BLOCKKEY`); feedback is stored against it |
| `tile_id` | integer for MapLibre feature-state — **per build, not durable** |
| `route_id`, `route_name` | the street the block belongs to |
| `function` | Local, Collector, Minor Arterial, Principal/Primary Arterial, Other Freeway and Expressway, Interstate, Other |
| `num_lanes_raw` / `num_lanes` | lane count as published / with missing values filled in |
| `speed_limit_raw` / `speed_limit` | mph as published / with missing values filled in |
| `bike_facility_type` | `none`, `painted_lane`, `buffered_lane`, `protected_track` |
| `parking_presence`, `road_width`, `pavement_condition`, `slow_street` | street attributes as published (width is the total cross-section) |
| `len` | segment length |
| `crash_count_5yr`, `serious_injury_count_5yr`, `fatal_count_5yr` | crashes attached to the block within the run's five-year window |
| `geometry` | simplified line geometry |
