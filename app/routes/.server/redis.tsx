import { createClient } from "redis";

const client = createClient({
  password: "rww09binPrxgBfbJSWdP61vTJCYOnMea",
  socket: {
    host: "redis-16932.c85.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 16932,
  },
});

await client.connect();

client.on("error", (err) => console.log("Redis Client Error", err));

export { client };
