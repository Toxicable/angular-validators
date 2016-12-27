var context = require.context('./spec', true, /\.spec\.ts/);
context.keys().forEach(context);
module.exports = context;