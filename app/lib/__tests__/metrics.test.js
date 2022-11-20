
const metrics = require('../metrics');
const response = require('./responses.json');

test('Update metrics', () => {
  response.forEach(res => {
    metrics.updateMetrics(res);
  });
  const expected = ['ETHUSDT-aggTrade', 'BTCUSDT-trade', 'BTCUSDT-aggTrade']
  expect(Object.keys(metrics.getMetrics())).toEqual(expect.arrayContaining(expected))
});



test('resetMetrics', () => {
  metrics.resetMetrics()
  const expected = ['ETHUSDT-aggTrade', 'BTCUSDT-trade', 'BTCUSDT-aggTrade']
  expect(metrics.getMetrics()).toEqual({})
});


