import http from "http";

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

let currentServerIndex = 0;

const server = http.createServer((req, res) => {
  const targetServer = servers[currentServerIndex];

  console.log(`Forwarding request to: ${targetServer}`);
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

  currentServerIndex = (currentServerIndex + 1) % servers.length;
});

server.listen(3000, () => {
  console.log("Load Balancer is running on port 3000.");
});
