# 2.2P – Express Web Servers

SIT725 Applied Software Engineering, Task 2.2P.

A simple Node.js web server built with Express. It serves a web page from the `public` folder and has a REST API that does calculations on the server.

## Part 1 – Web server and HTTP methods

- `express.static` serves `public/index.html`, `public/style.css` and `public/script.js`.
- `GET /hello` is a simple test endpoint.
- `/things` shows the four main HTTP methods from the HTTP Methods video, using nouns (resources) in the URL:

| Method | URL | Action |
|--------|-----|--------|
| GET | `/things` | Get the list of things |
| GET | `/things/1` | Get thing 1 |
| POST | `/things` | Create a new thing (JSON body `{ "name": "..." }`) |
| PUT | `/things/1` | Replace thing 1 (JSON body `{ "name": "..." }`) |
| DELETE | `/things/1` | Delete thing 1 |

The data is kept in memory, so it resets when the server restarts.

## Part 2 – Calculator REST API

| Method | URL | Example result |
|--------|-----|----------------|
| GET | `/add?a=5&b=3` | `{"operation":"add","a":5,"b":3,"result":8}` |
| GET | `/subtract?a=10&b=4` | `result: 6` |
| GET | `/multiply?a=6&b=7` | `result: 42` |
| GET | `/divide?a=20&b=5` | `result: 4` |
| POST | `/calculate` with body `{"operation":"add","a":5,"b":3}` | `result: 8` |

If a number is missing or not a number, or you divide by zero, the server returns status `400` with an error message. If a POST request has an invalid JSON body, the server returns `{"error":"Invalid JSON body"}`.

## How to run

You need [Node.js](https://nodejs.org/) installed.

```bash
cd 2.2P
npm install
npm start
```

On Windows PowerShell, if `npm` is blocked by the script execution policy, use `npm.cmd install` and `npm.cmd start` instead.

Then open <http://localhost:3000> in the browser, or call an endpoint directly, for example <http://localhost:3000/add?a=5&b=3>.

Test the POST endpoint from a terminal:

```bash
curl -X POST http://localhost:3000/calculate -H "Content-Type: application/json" -d "{\"operation\":\"add\",\"a\":5,\"b\":3}"
```

## Files

- `server.js` – Express server, endpoints and calculator functions
- `package.json` – project details and the Express dependency
- `public/` – static web page (HTML, CSS, JS)
- `screenshots/` – evidence of the code running
