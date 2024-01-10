const express = require('express');
const crypto = require('crypto');

const app = express();

app.get('/', (req, res) => {
  const cookie = req.headers.cookie;
  const sessCookie = cookie
    ?.split(';')
    ?.find((item) => item.includes('session_id'));
  const sessionId = sessCookie?.split('=')?.[1];

  res.write(`
    <html>
        <body>
          <h1>welcome to auth server</h1>
          ${sessionId || 'no session'}
          <a href="/set-cookie">click to set cookie</a>
          <a href="/unset-cookie">click to unset cookie</a>
          <a href="http://app.testing.com:5000">click to go to the app server</a>
        </body>
    </html>
  `);
  res.end();
});

app.get('/set-cookie', (req, res) => {
  res.setHeader(
    'set-cookie',
    `session_id=${crypto.randomUUID()}; HttpOnly; Domain=testing.com; Path=/;`
  );
  res.redirect('/');
  res.end();
});

app.get('/unset-cookie', (req, res) => {
  res.setHeader(
    'set-cookie',
    `session_id=; HttpOnly; Domain=testing.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`
  );
  res.redirect('/');
  res.end();
});

app.listen(4000, () => {
  console.log('auth server runnning at 4000 port');
});
