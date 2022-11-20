const logger = require('./logger');
let metricsMap = {};

const resetMetrics = () => {
  metricsMap = {};
  logger.debug('Reset Metrics', 'Latency metrics reset');
  console.log()
};

const updateMetrics = (payload) => {
  const {E: eventTime, e: eventType, s: symbol} = payload;
  if(eventTime)
  {
    const key = `${symbol}-${eventType}`;

    const currentTime = Date.now();
    const latency = currentTime - eventTime;

    if (metricsMap[key]) {
      metricsMap[key].push(latency);
    } else {
      metricsMap[key] = [latency];
    }
  }
};

const getMetrics = () => metricsMap;

const logMetrics = (logInterval) => {
  setInterval(() => {
    const latency = getMetrics();
    for (const key in latency) {
      const avg = latency[key].reduce((a, b) => a + b, 0) / latency[key].length;
      const max = Math.max(...latency[key]);
      const min = Math.min(...latency[key]);
      logger.info(key, 'Log Metrics', 
      `Min: ${min.toFixed(2)}ms  Avg: ${avg.toFixed(2)}ms  Max: ${max.toFixed(2)}ms`);
    }
    resetMetrics();
  }, logInterval);
}



module.exports = {
  updateMetrics,
  logMetrics,
  getMetrics,
  resetMetrics
};