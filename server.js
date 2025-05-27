const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const log = {
    ...req.body,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    timestamp: new Date().toISOString()
  };

  fs.readFile('logs.json', 'utf8', (err, data) => {
    const logs = data ? JSON.parse(data) : [];
    logs.push(log);
    fs.writeFile('logs.json', JSON.stringify(logs, null, 2), () => {
      console.log(`[+] Записан заказ от ${log.email} — IP: ${log.ip}`);
      res.json({ ok: true });
    });
  });
});

app.listen(port, () => {
  console.log(`Запущено на http://localhost:${port}`);
});
