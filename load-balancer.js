import http from "http";

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

let currentServerIndex = 0;

const checkServerHealth = (server) => {
  return new Promise((resolve) => {
    const request = http.get(`${server}/health`, (response) => {
      resolve(response.statusCode === 200);
    });

    request.on("error", () => {
      resolve(false);
    });

    request.setTimeout(2000, () => {
      request.destroy();
      resolve(false);
    });
  });
};

const server = http.createServer(async (req, res) => {
  let targetServer;

  for (let i = 0; i < servers.length; i++) {
    const candidateServer = servers[currentServerIndex];

    currentServerIndex = (currentServerIndex + 1) % servers.length;

    if (await checkServerHealth(candidateServer)) {
      targetServer = candidateServer;
      break;
    }
  }

  if (!targetServer) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");

    return res.end(
      JSON.stringify({
        message: "No healthy servers available",
      })
    );
  }

  console.log(`Forwarding request to: ${targetServer}`);

  const proxyRequest = http.request(
    targetServer + req.url,
    {
      method: req.method,
      headers: req.headers,
    },
    (proxyResponse) => {
      res.writeHead(
        proxyResponse.statusCode,
        proxyResponse.headers
      );

      proxyResponse.pipe(res);
    }
  );

  proxyRequest.on("error", (error) => {
    console.error("Load Balancer proxy error:", error.message);

    if (!res.headersSent) {
      res.statusCode = 502;
      res.end("Bad Gateway");
    }
  });

  req.pipe(proxyRequest);
});

server.listen(3000, () => {
  console.log("Load Balancer is running on port 3000.");
});