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
    const server = servers[currentServerIndex];

    currentServerIndex = (currentServerIndex + 1) % servers.length;

    if (await checkServerHealth(server)) {
      targetServer = server;
      break;
    }
  }
  if (!targetServer) {
    return res.status(503).json({
      message: "No healthy servers available",
    });
  }

  const proxyRequest = http.request(
    targetServer + req.url,
    {
      method: req.method,
    },
    (proxyResponse) => {
      proxyResponse.pipe(res);
    },
  );

  proxyRequest.end();
});

server.listen(3000, () => {
  console.log("Load Balancer is running on port 3000.");
});
