import React from 'react';
import App from '../componnets/App';
import Koa from 'koa';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from "react-router-dom/server";


const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
  const sheet = new ServerStyleSheet();
  if (ctx.url === '/client') {
    const content = fs.readFileSync('./dist/client.js', 'binary');
    ctx.body = content;
  } else {
    try {
      const content = ReactDOMServer.renderToString(sheet.collectStyles(
        <StaticRouter location={ctx.url}>
          <App />
        </StaticRouter>
      ));
      const styleTags = sheet.getStyleTags();
      ctx.body = `
      <!DOCTYPE html>
      <html>
        <head>
          ${styleTags}
          <script defer src="client"></script>
        </head>
        <body style="margin: 0">
          <div id="root">${content}</div>
        </body>
      </html>
    `;
    } catch (e) {
      console.error(e);
    } finally {
      sheet.seal();
    }
  }
});

app.listen(3000);
