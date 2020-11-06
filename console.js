let repl = require('repl');
let models = require('./app/models');

Object.keys(models).forEach(modelName => {
  global[modelName] = models[modelName];
});

let replServer = repl.start({
  prompt: 'app > '
});

replServer.context.db = models;