const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const cookie = req.headers.cookie;
  const sessCookie = cookie
    ?.split(';')
    ?.find((item) => item.includes('session_id'));
  const sessionId = sessCookie?.split('=')?.[1];

  if (!sessionId) {
    res.status(403);
    res.end();
  }

  res.write(`
    <html>
        <body>
          <h1>welcome to app server</h1>
          ${sessionId}
          <a href="http://auth.testing.com:4000">click to go back to auth server</a>
        </body>
    </html>
  `);
  res.end();
});

app.listen(5000, () => {
  console.log('auth server runnning at 5000 port');
});
