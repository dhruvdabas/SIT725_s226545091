# 3.2P – Getting Graphical (Plant Care Guide)

SIT725 Applied Software Engineering, Task 3.2P.

A small web application built by following the Week 3 practical ("Bootstrapping Express App"): an **Express** server, a **Materialize** UI, and a simple **GET REST endpoint** that the client calls to build the page.

Following the task sheet, the domain is changed from the practical's kitten cards to a **Plant Care Guide**, with my own data, images and text. The architecture, folder structure and API shape match the practical.

## Features

- Materialize **navbar** with a logo and a GitHub link
- **Materialbox** banner image (click it to zoom)
- **Cards** with a card reveal showing each plant's care tips
- The cards are **built at runtime from the REST API** (`GET /api/plants`) using jQuery
- A **modal** form ("Join the Plant Club"). On submit, the form data is printed in the browser console (as in the practical) and a Materialize toast is shown

## REST API

| Method | URL | Response |
|--------|-----|----------|
| GET | `/api/plants` | `{ "statusCode": 200, "data": [ { "title", "image", "link", "description" }, ... ], "message": "Success" }` |

The client (`public/js/scripts.js`) calls `$.get('/api/plants', ...)` and passes `response.data` to `addCards()`, which adds one Materialize card per plant to `#card-section`.

## Folder structure

```
3.2P/
├── server.js            Express server, static files, GET /api/plants
├── package.json         project details, "start" script, Express dependency
├── public/
│   ├── index.html       Materialize page (navbar, banner, button, cards section, modal)
│   ├── css/styles.css   custom styles
│   ├── js/scripts.js    jQuery: call the API, add cards, modal form
│   └── images/          my own SVG images (logo, banner, plants)
└── screenshots/         evidence of the app running
```

## How to run

You need [Node.js](https://nodejs.org/) installed.

```bash
cd 3.2P
npm install
npm start
```

On Windows PowerShell, if `npm` is blocked by the script execution policy, use `npm.cmd install` and `npm.cmd start` instead.

The terminal shows `App listening to: 3000`. Open <http://localhost:3000> for the web page, or <http://localhost:3000/api/plants> for the API.

## Screenshots

| File | Shows |
|------|-------|
| `01-home-navbar-banner.jpg` | Navbar, heading and materialbox banner |
| `02-cards-from-api.jpg` | Plant cards created from the `GET /api/plants` response |
| `03-card-reveal.jpg` | Card reveal with care tips |
| `04-modal-form.jpg` | Modal form opened from the button |
| `05-form-submitted-toast.jpg` | Toast after submitting the form |
| `06-get-api-plants.jpg` | JSON response of `GET /api/plants` |
