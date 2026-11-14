const urlEl = document.getElementById('url');
const resultEl = document.getElementById('result');

function getInputs() {
  return {
    a: document.getElementById('a').value,
    b: document.getElementById('b').value
  };
}

function show(data) {
  resultEl.textContent = data.error ? 'Error: ' + data.error : data.result;
}

document.querySelectorAll('button[data-op]').forEach(button => {
  button.addEventListener('click', async () => {
    const { a, b } = getInputs();
    const url = `/${button.dataset.op}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`;
    urlEl.textContent = 'GET ' + url;
    const response = await fetch(url);
    show(await response.json());
  });
});

document.getElementById('post').addEventListener('click', async () => {
  const { a, b } = getInputs();
  const body = { operation: 'add', a, b };
  urlEl.textContent = 'POST /calculate ' + JSON.stringify(body);
  const response = await fetch('/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  show(await response.json());
});
