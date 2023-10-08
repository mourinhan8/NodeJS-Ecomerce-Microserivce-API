import mongoose from 'mongoose';
import os from 'os';
import process from 'process';

const _SECONDS = 5000;

export const countConnect = () => {
  const nuwConnections = mongoose.connections.length;
  console.log(`Number of connect::${nuwConnections}`);
};

export const checkOverload = () => {
  setInterval(() => {
    const nuwConnections = mongoose.connections.length;
    const numCore = os.cpus().length;
    const memoryUsed = process.memoryUsage().rss;
    // Example maximum number of connection on number of cores
    const maxConnections = numCore * 5;

    console.log(`Active connections:${nuwConnections}`);

    console.log(`Memory usage:: ${memoryUsed / 1024 / 1024} MB`)

    if (nuwConnections > maxConnections) {
      console.log('Connection Overload Detected');
      // notify.send(...)
    }
  }, _SECONDS); // monitor every 5 seconds
};
