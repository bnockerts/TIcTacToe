/*eslint no-console:0 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const port = config.devServer.port;

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift('webpack-dev-server/client?http://127.0.0.1:' + port);

const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer)
  .listen(port, 'localhost', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:' + port);
  });

compiler.plugin('done', () => {
  setTimeout(() => {
    console.log('\n✓ The bundle is now ready for serving!\n');
    console.log('  Open in iframe mode:\t\x1b[33m%s\x1b[0m',  'http://localhost:' + port + '/webpack-dev-server/');
    console.log('  Open in inline mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + port + '/\n');
    console.log('  \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes.')
  }, 350);
});
