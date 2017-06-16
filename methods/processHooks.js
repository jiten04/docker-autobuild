const async = require('async');
const wreck = require('wreck');
module.exports = function(build, done) {
  const server = this;
  async.each(build, (item, next) => {
    if (typeof item.hook === 'string') {
      item.hook = { url: item.hook };
    }
    if (!item.hook.payload) {
      item.hook.payload = {};
    }
    item.hook.payload.image = item.image;
    server.log(['hook', 'notice'], {
      message: `Sending webhook: ${item.hook.url}`,
      payload: item.hook.payload
    });
    wreck.post(item.hook.url, {
      payload: JSON.stringify(item.hook.payload)
    }, (err) => {
      if (err) {
        server.log(['hook', 'error', item.hook.url, item.image], err);
      } else {
        server.log(['hook', 'success'], {
          message: `Sent webhook: ${item.hook.url}`,
          payload: item.hook.payload
        });
      }
      next();
    });
  }, done);
};
