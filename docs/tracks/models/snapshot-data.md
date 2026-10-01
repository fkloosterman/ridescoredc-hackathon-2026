# Reference: The Snapshot Data

*Cross-cutting reference. Used by Challenge 1 (Safety scores) and Challenge 2 (Base map). Challenge 3 (Data pipeline) uses different data, but links to this through `dc_blockkey`; see the end of this page.*

## What the data is

The data is a map of DC's bikeable street network, split into 28,978 street segments. A segment is a stretch of street or bike trail between two intersections, and it also splits wherever something about the street changes, such as a bike lane starting mid-block. Each segment carries two sources side by side:

- **OpenStreetMap (OSM):** the street network itself, plus detailed bike-facility tags.
- **DDOT Roadway SubBlock:** DC's official street records. Each OSM segment is matched to the DDOT street it runs along.

It's raw data, not model output. There are no LTS, BNA or RideScore scores. Every model starts from the same columns.

The network includes streets and bike trails. Alleys, sidewalks, service roads and motorways aren't included.

## Columns

| Column | What it is |
|---|---|
| `osm_u`, `osm_v`, `osm_key` | Together, the segment's ID: the OSM node at each end, plus a key |
| `osm_*` | OSM tags, with `:` changed to `_`. For example, `cycleway:right` becomes `osm_cycleway_right` |
| `dc_*` | DDOT attributes: speed limit, lanes, widths, bike lanes, parking, pavement, traffic volume (AADT) and more, plus `dc_VERTICAL_DEFLECTION` (speed humps and similar) and `dc_SURFACE_TYPE` |
| `dc_WARD_ID`, `dc_ANC_ID`, `dc_SMD_ID` | Ward, ANC and SMD of the matched street |
| `dc_blockkey`, `dc_subblockkey` | DDOT's own IDs for the matched street |
| `match_confidence` | How much of the segment runs along the matched DDOT street (0–1) |
| `dc_primary_share` | How much runs along the one SubBlock whose attributes were copied. Below 1 means the segment crosses a SubBlock boundary |
| `match_status` | `good` (confidence ≥ 0.8), `weak`, or `none` (no DDOT match, so the `dc_*` columns are empty) |

## How well the two sources match

| Match status | Segments | Share |
|---|---|---|
| Good | 26,974 | 93.1% |
| Weak | 605 | 2.1% |
| None | 1,399 | 4.8% |

As a separate check, street names agree on 91% of matched segments where both sources have a name. Most segments with no match are short stubs near intersections, stretches where DDOT only has an alley or driveway, or paths that aren't in DDOT's records.

## Before you build on it

- **Which source should you trust?** There's no rule yet, which is why both are included. Across matched segments, DDOT is far more complete for engineering fields: speed limit is filled in for 84% of segments vs. 30% in OSM, and lanes for 100% vs. 48%. OSM is better for bike facilities (trails, protected and contraflow lanes, `oneway:bicycle`) and is updated faster.
- **Weak and unmatched segments stay in.** Your work needs to handle missing `dc_*` values on purpose.
- **Separate cycle tracks copy the street beside them.** A protected track drawn as its own line picks up the neighboring street's speed and lanes, so don't score it as if it were that arterial. Because both the street and the track exist, totals for length or connectivity can double-count.
- **IDs only hold within this snapshot.** They change when OSM is edited, so everyone should use the same dated snapshot.
- **Some DDOT data is old.** Traffic volume (AADT) is from 2020, a pandemic year with traffic well below normal. Pavement condition is from 2023, and road roughness from 2019.

## Crash data

Crash records aren't part of the snapshot. They cover five years of DC crashes where a cyclist was injured or killed (Crashes in DC, Open Data DC), and they come with the scoring pipeline (see Challenge 3). Crashes are tied to DDOT Blocks, and `dc_blockkey` points to the same Blocks, so crashes can be linked to matched segments. One Block can cover several segments.

## Linking to the scoring pipeline

The pipeline's `segment_id` is DDOT's `BLOCKKEY`, the same value as `dc_blockkey` in the snapshot. That is the only bridge between the two: a pipeline block can match several snapshot segments, and the snapshot's own segment ID (`osm_u`, `osm_v`, `osm_key`) has no counterpart in the pipeline.

*Curious how the match works? The basemap notebook (Challenge 2) walks through the join step by step.*
