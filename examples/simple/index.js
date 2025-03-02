const { Logger, processors, transports } = require("../..");

const { context, timestamp, json, human } = processors;
const { stream } = transports;

const logger = new Logger({
  processors: [
    context(),
    timestamp(),
    process.env.NODE_ENV === "production" ? json() : human(),
  ],
  transports: [stream()],
});

setInterval(() => {
  logger.info("Hey Buddah!", {
    pid: process.pid,
    env: process.env.NODE_ENV,
    ...process.memoryUsage(),
  });
}, 1000);

setInterval(() => {
  logger.warn("Monkey, watch out!", {
    pid: process.pid,
    env: process.env.NODE_ENV,
    ...process.memoryUsage(),
  });
}, 7000);

setInterval(() => {
  logger.error("I love a good fight!", new Error("Oooh, Demons!"), {
    pid: process.pid,
    env: process.env.NODE_ENV,
    ...process.memoryUsage(),
  });
}, 3000);
