const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  next(err);
});

app.get('/hello', (req, res) => {
  res.send('Hello from the Express server!');
});

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

const operations = { add, subtract, multiply, divide };

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

app.get('/add', (req, res) => {
  const { status, body } = calculate('add', req.query.a, req.query.b);
  res.status(status).json(body);
});

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

app.post('/calculate', (req, res) => {
  const { operation, a, b } = req.body || {};
  if (!operations[operation]) {
    return res.status(400).json({ error: 'operation must be add, subtract, multiply or divide' });
  }
  const { status, body } = calculate(operation, a, b);
  res.status(status).json(body);
});

let things = [
  { id: 1, name: 'First thing' },
  { id: 2, name: 'Second thing' }
];
let nextId = 3;

app.get('/things', (req, res) => {
  res.json(things);
});

app.get('/things/:id', (req, res) => {
  const thing = things.find(t => t.id === Number(req.params.id));
  if (!thing) return res.status(404).json({ error: 'Thing not found' });
  res.json(thing);
});

app.post('/things', (req, res) => {
  const name = req.body && req.body.name;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const thing = { id: nextId++, name };
  things.push(thing);
  res.status(201).json(thing);
});

app.put('/things/:id', (req, res) => {
  const index = things.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Thing not found' });
  const name = req.body && req.body.name;
  if (!name) return res.status(400).json({ error: 'name is required' });
  things[index] = { id: things[index].id, name };
  res.json(things[index]);
});

app.delete('/things/:id', (req, res) => {
  const index = things.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Thing not found' });
  const removed = things.splice(index, 1)[0];
  res.json({ message: 'Deleted', thing: removed });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
