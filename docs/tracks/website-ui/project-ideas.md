# Mini-project Ideas

## Mini-Project Ideas

## 1. Give RideScore DC a Front Door

**Level: Beginner**

#### Background

The current website consists primarily of maps. This works well for people who already know what RideScore DC is, but gives new visitors little context about the project or where to begin.

#### The challenge

Create a **landing page** that introduces RideScore DC and provides clear navigation to the map and route survey.

The page should briefly explain what RideScore DC does, what the safety scores mean, and how visitors can explore the map or contribute their own experience.

#### What you'll learn

Web UI development, page layout, accessibility, and communicating a technical project to a general audience.

#### Resources

- [RideScore DC development site](https://dev.ridescoredc.com/)
- [Website repository](https://github.com/civictechdc/ridescoredc-website)

#### Stretch goals

- Add simple visual explanations or illustrations.
- Make the page particularly effective on mobile devices.
- Add a short interactive introduction to the scoring system.

---

### 2. Teach People How to Use RideScore DC

**Level: Beginner → Intermediate**

#### Background

The map and survey contain several features that may not be obvious to a first-time visitor.

#### The challenge

Create an **interactive in-app tutorial** that introduces the most important features of RideScore DC.

For example, the tutorial could show users how to explore the map, inspect a street segment, understand the safety-score visualization, and submit route feedback.

#### What you'll learn

Interactive web UI, user experience design, and working with an existing application.

#### Resources

- [RideScore DC development site](https://dev.ridescoredc.com/)
- [Website repository](https://github.com/civictechdc/ridescoredc-website)

#### Stretch goals

- Remember whether the user has completed the tutorial.
- Provide contextual help instead of one linear walkthrough.
- Add a way to restart the tutorial.
- Test the tutorial with someone unfamiliar with RideScore DC.

---

### 3. Explain the Safety Score

**Level: Beginner → Intermediate**

#### Background

RideScore DC uses a modified Level of Traffic Stress (LTS) approach. The methodology is based on established approaches, but the current website does not explain clearly how the scores are produced.

#### The challenge

Create a **methodology page** explaining the safety score in language that a general audience can understand.

The page should explain what LTS means, what kinds of roadway characteristics affect the score, and how RideScore DC's approach relates to established methodologies.

#### What you'll learn

Technical communication, data interpretation, and translating domain-specific methodology into accessible explanations.

#### Resources

- [Montgomery Planning LTS methodology](https://montgomeryplanning.org/wp-content/uploads/2017/11/Appendix-D.pdf)
- [PeopleForBikes City Ratings methodology](https://cityratings.peopleforbikes.org/about/methodology)
- [RideScore DC development site](https://dev.ridescoredc.com/)
- [Website repository](https://github.com/civictechdc/ridescoredc-website)

#### Stretch goals

- Add interactive examples.
- Explain why a particular street received its score.
- Connect explanations directly to examples on the map.

---

### 4. Make the Map Easier to Understand

**Level: Intermediate**

#### Background

The main map is the primary way users explore RideScore DC. It displays safety scores for individual street segments and provides additional information when a segment is selected.

#### The challenge

Improve the **visualization of safety scores and the information shown for individual street segments**.

Possible areas include the map colors and legend, different zoom levels, popup information, or the presentation of the factors contributing to a score.

Choose one or two improvements that make the map easier to understand.

#### What you'll learn

MapLibre/web mapping, data visualization, UI design, and working with geospatial data in a browser.

#### Resources

- [Development site](https://dev.ridescoredc.com/)
- [Website repository](https://github.com/civictechdc/ridescoredc-website)

#### Stretch goals

- Show a breakdown of the factors contributing to a score.
- Experiment with different visualization approaches.
- Improve the map's behavior at different zoom levels.
- Test the changes with someone unfamiliar with the project.

---

### 5. Explore the Numbers Behind the Map

**Level: Intermediate**

#### Background

The map shows the score of individual street segments, but it is difficult to understand the characteristics of the network as a whole.

#### The challenge

Create a **summary statistics view** for the DC road network and its safety scores.

Possible questions include:

- How much of the network falls into each stress level?
- How are scores distributed?
- How do scores vary geographically?
- How do different scoring assumptions affect the network?

Start with a small number of useful statistics rather than trying to build a complete dashboard.

#### What you'll learn

Data visualization, exploratory data analysis, and presenting geospatial data to non-technical users.

#### Resources

- [Development site](https://dev.ridescoredc.com/)
- [Website repository](https://github.com/civictechdc/ridescoredc-website)

#### Stretch goals

- Make statistics respond to changes in scoring parameters.
- Compare different areas of DC.
- Visualize distributions rather than only summary numbers.
- Link statistics back to locations on the map.

---

### 6. Rethink Route Drawing

**Level: Intermediate**

#### Background

The `/survey/` page allows visitors to draw a bicycle route and report how safe and comfortable it feels. This is an important connection between the computational models and people's real-world experience.

#### The challenge

Improve the existing route-drawing experience or experiment with an alternative.

Possible approaches include:

- Clicking street segments to construct a route.
- Selecting a start and destination and generating a route automatically.
- Adding intermediate points to modify an automatically generated route.
- Making it easier to correct mistakes.
- Improving the experience on mobile devices.

#### What you'll learn

Interactive maps, routing, geospatial user interfaces, and designing for real-world users.

#### Resources

- [RideScore DC survey](https://dev.ridescoredc.com/survey/)
- [Website repository](https://github.com/civictechdc/ridescoredc-website)

#### Stretch goals

- Show the computed Ride Score while a route is being created.
- Compare the reported route with the modeled score.
- Try multiple route-building approaches and compare them.

---

### 7. Experiment with PMTiles

**Level: Advanced**

#### Background

The current map uses Martin to serve vector tiles from the database. An important feature of the current system is that safety scores can be calculated dynamically using user-defined weights.

PMTiles provides another way to distribute vector tiles as static files. It could potentially simplify tile serving or improve performance, but it introduces different tradeoffs.

#### The challenge

Build a **small PMTiles proof of concept** and compare it with the current Martin-based approach.

Start with static safety-score tiles. The goal is to determine whether PMTiles provides a useful alternative and whether it changes the user experience.

#### What you'll learn

Vector tiles, MapLibre, web mapping infrastructure, and performance tradeoffs.

#### Resources

- [Website repository](https://github.com/civictechdc/ridescoredc-website)
- [PMTiles](https://github.com/protomaps/PMTiles)
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/)

#### Stretch goals

Explore whether **dynamic safety scores can also be supported with PMTiles**, potentially by storing the score components in the tiles and calculating the final score in MapLibre on the client.
