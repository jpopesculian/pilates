# Pilates Powerhouse Studio

This is a [Requirejs](http://requirejs.org/) project. If hosting locally, you may have to run a server, which can be by running [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html) in the root folder:

```bash
python -m SimpleHTTPServer 8000
```

## Architecture

Vendor javascript is located in the `js/` folder. `index.html` asynchronously loads these to bootstrap the resources (`css/` and `img/`) as well as the modules in the `app/` folder which contains:

* `main.js`: routes various requests to serve modules
* `modules/`: holds modules to be served. Usually serves views and populates them with config/partials
* `views/`: html views and templates
* `partials/` partials which can be repeated in modules and loaded into views
* `config/`: configuration and settings (includes gallery and timetables)

## Editing

To Edit the views (aka: the main pages) and text, edit the `*.html` files directly in the `app/views/` or `app/partials/` folder. Metadata however should be added to `index.html`.

### CSS

Edit the `_*.scss` components in the `scss/` folder. If adding a component, make sure to edit the `main.scss` imports list. SCSS can be compiled by running the following command from the terminal in the root folder (requires [sass gem](https://rubygems.org/gems/sass)):

```bash
sass --watch scss:css
```

### Gallery

The gallery can be edited, by editing `app/config/gallery.json`. You can simply add more photo objects to the `items` array. The gallery is made using [PhotoSwipe](http://photoswipe.com/), and the keys are as follows:

* `src`: big image source
* `w`: big image width
* `h`: big image height
* `msrc`: thumbnail source
* `title`: image caption
* `alt`: image alt-tag

### Time Table

The time table is a simple object located in `app/config/classes.json/` containing a `rows` array, which has each row of the table. Each row is an object with a `time` label, and six items in a `schedule` array for each day of the week. The days of the week labels can be edited in the `days` array at the bottom of the JSON.
