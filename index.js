var superagent = require('superagent'),
    assert     = require('assert'),
    url        = require('url');


function RemoteStorage(cfg) {
  assert(typeof cfg === 'object', 'requires config object');
  assert(typeof cfg.storageInfo === 'object', 'requires storageInfo object');
  assert(typeof cfg.storageInfo.href === 'string', 'requires storageInfo.href string');
  assert(typeof cfg.bearerToken === 'string', 'requires bearerToken string');

  try {
    this.options.parsedURL = url.parse(cfg.storageInfo.href);
  } catch (e) {
    throw new Error('unable to parse URL storageInfo.href: ' + cfg.storageInfo.href);
  }
  this.options.baseURL = cfg.storageInfo.href;
  this.options.headers = { 'Authorization': 'Bearer ' + cfg.bearerToken };
}

RemoteStorage.prototype.post = function (path, obj, cb) {
  superagent
    .post(this.options.baseURL + path)
    .set('Authorization', this.options.headers.Authorization)
    .send(obj)
    .end(function (err, res) {
      if (err) {
        return cb(err);
      }
      cb({
        mimeType: res.headers['content-type'].split(';')[0],
        data: res.text
      });
    });
};

RemoteStorage.prototype.get = function (path, cb) {

  this.options.method = method;
  if (path.charAt(0) !== '/') {
    path = '/' + path;
  }

  // if (this.options.mimeType) {
  //   this.options.headers['Content-Type'] = p.mimeType + '; charset=UTF-8';
  // }

  console.debug(' [remotestorage] HTTP GET options: ' + JSON.stringify(this.options));


  superagent
    .get(this.options.baseURL + path)
    .set('Authorization', this.options.headers.Authorization)
    .end(function (err, res) {
      if (err) {
        return cb(err);
      }
      cb({
        mimeType: res.headers['content-type'].split(';')[0],
        data: res.text
      });
    });

};


module.exports = RemoteStorage;
