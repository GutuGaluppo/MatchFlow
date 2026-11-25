import { createApp } from "./server.ts";

const port = Number(process.env.PORT || "4000");
const host = process.env.HOST || "127.0.0.1";
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("PORT must be a valid integer.");
createApp().listen(port, host, () => {
  console.log(`MatchFlow Candidates API ready at http://${host}:${port}`);
  console.log(`Try http://${host}:${port}/api/candidates`);
});
