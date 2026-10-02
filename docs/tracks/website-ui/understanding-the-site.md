# Understanding the site

*How RideScore DC's website fits together. Read the summary here, then the page you need.*

## The short version

The website is plain HTML and JavaScript with **no build step**: the files you edit in `frontend/` are exactly what the site serves. A browser loads two pages, the **map** (`/`) and the **survey** (`/survey/`). Both draw streets with MapLibre from **map tiles** that the **Martin** tile server makes from the **PostGIS** database. The only time the browser talks to the **API** is when someone submits a survey. **nginx** routes every request to the right place.

| A request for | Is answered by | Which reads |
|---|---|---|
| `/`, `/survey/` | nginx, straight from disk | the `frontend/` folder |
| `/tiles/...` | Martin | the database's `serving` area |
| `/api/...` | the API | the database's `app` area (survey responses) |

Two rules shape every change: the **survey never shows our scores**, so riders give their own view first; and survey answers are stored by a street block's lasting **`segment_id`**, never the per-build `tile_id`.

## The pages in this section

### [How the site works](/tracks/website-ui/how-the-site-works)

A schematic of the four programs (nginx, Martin, the API, PostGIS), how a request is answered, the three database areas (`data`, `app`, `serving`), how the map and survey pages are built, and where the data comes from.

### [Repository layout](/tracks/website-ui/repository-layout)

The file tree of the website repository, where to look for the change you want to make, what each `npm run` command does, and which files are never committed.

### [The data](/tracks/website-ui/the-data)

The three datasets behind the map (13,829 street blocks, 2,224 crashes, and a score for every block), and what each column means.
