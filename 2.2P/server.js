// SIT725 Task 2.2P - Express Web Server
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Part 1: serve static files (index.html, CSS, JS) from the public folder
app.use(express.static(__dirname + '/public'));
// Parse JSON request bodies (needed for POST / PUT)
app.use(express.json());

// ---------- Part 1: a simple endpoint ----------
app.get('/hello', (req, res) => {
  res.send('Hello from the Express server!');
});

// ---------- Part 2: calculator functions ----------
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

const operations = { add, subtract, multiply, divide };

// Read and validate two numbers; returns null if invalid
function parseNumbers(a, b) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);
  if (isNaN(num1) || isNaN(num2)) return null;
  return { num1, num2 };
}

function calculate(operation, a, b) {
  const nums = parseNumbers(a, b);
  if (!nums) {
    return { status: 400, body: { error: 'Please provide two valid numbers a and b' } };
  }
  if (operation === 'divide' && nums.num2 === 0) {
    return { status: 400, body: { error: 'Cannot divide by zero' } };
  }
  const result = operations[operation](nums.num1, nums.num2);
  return { status: 200, body: { operation, a: nums.num1, b: nums.num2, result } };
}

// GET /add?a=5&b=3  -> adds two numbers on the server
app.get('/add', (req, res) => {
  const { status, body } = calculate('add', req.query.a, req.query.b);
  res.status(status).json(body);
});

// GET /subtract, /multiply, /divide with the same query format
app.get('/subtract', (req, res) => {
  const { status, body } = calculate('subtract', req.query.a, req.query.b);
  res.status(status).json(body);
});

app.get('/multiply', (req, res) => {
  const { status, body } = calculate('multiply', req.query.a, req.query.b);
  res.status(status).json(body);
});

app.get('/divide', (req, res) => {
  const { status, body } = calculate('divide', req.query.a, req.query.b);
  res.status(status).json(body);
});

// POST /calculate  body: { "operation": "add", "a": 5, "b": 3 }
app.post('/calculate', (req, res) => {
  const { operation, a, b } = req.body || {};
  if (!operations[operation]) {
    return res.status(400).json({ error: 'operation must be add, subtract, multiply or divide' });
  }
  const { status, body } = calculate(operation, a, b);
  res.status(status).json(body);
});

// ---------- Video example: resource-oriented REST (GET/POST/PUT/DELETE) ----------
// In-memory list of "things", following the examples from the HTTP methods video
let things = [
  { id: 1, name: 'First thing' },
  { id: 2, name: 'Second thing' }
];
let nextId = 3;

// GET /things -> retrieve a list of things
app.get('/things', (req, res) => {
  res.json(things);
});

// GET /things/:id -> retrieve one thing
app.get('/things/:id', (req, res) => {
  const thing = things.find(t => t.id === Number(req.params.id));
  if (!thing) return res.status(404).json({ error: 'Thing not found' });
  res.json(thing);
});

// POST /things -> create a new thing
app.post('/things', (req, res) => {
  const name = req.body && req.body.name;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const thing = { id: nextId++, name };
  things.push(thing);
  res.status(201).json(thing);
});

// PUT /things/:id -> replace a thing
app.put('/things/:id', (req, res) => {
  const index = things.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Thing not found' });
  const name = req.body && req.body.name;
  if (!name) return res.status(400).json({ error: 'name is required' });
  things[index] = { id: things[index].id, name };
  res.json(things[index]);
});

// DELETE /things/:id -> delete a thing
app.delete('/things/:id', (req, res) => {
  const index = things.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Thing not found' });
  const removed = things.splice(index, 1)[0];
  res.json({ message: 'Deleted', thing: removed });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
