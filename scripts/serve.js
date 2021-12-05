const esbuild = require("esbuild");
const fs = require("fs");
const http = require("http");
const build = require("./build");

(async function () {
  const port = 3000;
  const servePort = 3001;
  const serveHost = "localhost";

  /** @type {http.ServerResponse[]} */
  const clients = [];

  function triggerReload() {
    clients.forEach((client) => client.write("data: update\n\n"));
    clients.length = 0;
  }

  fs.watchFile("public/index.html", { interval: 500 }, triggerReload);
  fs.watchFile("public/styles.css", { interval: 500 }, triggerReload);

  build({
    banner: {
      js: '"use strict";\n(() => new EventSource("/reload").onmessage = () => location.reload())();',
    },
    watch: { onRebuild: triggerReload },
  });

  await esbuild.serve(
    {
      host: serveHost,
      port: servePort,
      servedir: "./public",
    },
    {}
  );

  const server = http.createServer(function (req, res) {
    if (req.url === "/reload") {
      return clients.push(
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        })
      );
    }
    req.pipe(
      http.request(
        {
          headers: req.headers,
          hostname: serveHost,
          method: req.method,
          path: req.url,
          port: servePort,
        },
        function (prxRes) {
          res.writeHead(prxRes.statusCode, prxRes.headers);
          prxRes.pipe(res, { end: true });
        }
      ),
      { end: true }
    );
  });

  server.listen(port);
  console.log(`🚀 development server running @ http://localhost:${port}`);
})();
