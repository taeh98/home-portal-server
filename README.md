A NodeJS lightweight server for a home portal homepage, designed for deployment on a Raspberry Pi.

System structure

Simple Node server to serve files

JS scripts to get news and write time on header (also search bar for search engine)

Lightweight database to hold links to commonly used sites to be on the portal page for rapid access
    displayed as tile icons
        JS to query and retrieve data in get requests --> inject onto portal page
        JS to write updates to database (adding/removing, updating number of clicks, etc)
        tiles ordered by number of clicks (most clicked towards top of page)


        database to be sqllite; run in memory and import and export from csv file in linkTiles folder