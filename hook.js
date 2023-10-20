//this file is a little example of how to use injecting ability
//to hook a function and change its behavior
//in this case we hook the function that is responsible for the decryption of the license
//and we change the behavior to return a valid license

// JUST FOR LEARNING PURPOSES, DON'T USE THIS TO CRACK SOFTWARE

//Adding hook
const crypto = require("crypto");
const pubdec = crypto["publicDecrypt"];
delete crypto["publicDecrypt"];
let fingerprint, email, uuid, license, computerInfo = "";

const fetch = require("electron-fetch")
fetch_bak = fetch['default'];
delete fetch['default'];
fetch.default = async function fetch(url, options) {
    log('[fetch]fetch ' + url);
    log('[fetch]Arg ' + JSON.stringify(options));
    data = await fetch_bak(url, options);
    if (url.indexOf('api/client/activate') != -1) {
        params = JSON.parse(options.body);
        fingerprint = params.f, email = params.email, uuid = params.u, license = params.license, computerInfo = params.l
        log('[activate]Fingerprint ' + fingerprint);
        log('[activate]Email ' + email);
        log('[activate]UUID ' + uuid);
        log('[activate]License ' + license);
        log('[activate]ComputerInfo ' + computerInfo);
        log('[fetch]RetCode ' + data.status);
        ret = await data.buffer();
        log('[fetch]Ret ' + ret.toString());

        data.text = () => {
            return new Promise((resolve, reject) => {
                resolve(ret.toString());
            });
        };
        data.json = () => {
            return new Promise((resolve, reject) => {
                resolve(JSON.parse(ret.toString()));
            });
        };
    }
    
    return new Promise((resolve, reject) => {
        resolve(data);
    });

}

http = require("http")

function log(str) {
    http.get('http://127.0.0.1:3000/log?str=' + str, res => {
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
}

log = console.log;
log('Hook Init')


var Module = require('module');
var originalRequire = Module.prototype.require;

Module.prototype.require = function () {
    log('Require ' + arguments[0])
    if (arguments[0] == 'crypto') {
        log('Hooking crypto');
        return crypto;
    }
    if (arguments[0] == 'electron-fetch') {
        log('Hooking electron-fetch');
        return fetch;
    }
    return originalRequire.apply(this, arguments);
};


console.log = log
let validator = {
    set: function (target, key, value) {
        if (key === 'log') {
            log('console.log override blocked');
            return;
        }
        target[key] = value;
    }
}

let proxy = new Proxy(console, validator);
console = proxy
module.exports = fetch

//hook finished
