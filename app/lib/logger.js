const config = require('../../config.json');

const logger =
{
  info: (scope, message, paramsToLog) =>
  {
    console.log(`[${scope}] - INFO - ${message}:  ${JSON.stringify(paramsToLog) || ''}`);
  },
  debug: (scope, message, paramsToLog) => {
    config.LOG_LEVEL === 'debug' && 
    console.log(`[${scope}] - DEBUG - ${message}:  ${JSON.stringify(paramsToLog) || ''}`);

  },
  error: (scope, message, paramsToLog) => {
    console.log(`[${scope}] - ERROR - ${message}:  ${JSON.stringify(paramsToLog) || ''}`);
  }
}

module.exports = logger;