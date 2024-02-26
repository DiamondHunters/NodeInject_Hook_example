@@ -1,27 +1,15 @@
//this file is a little example of how to use injecting ability	//this file is a little example of how to use injecting ability
//to hook a function and change its behavior	//to hook a function and change its behavior
//in this case we hook the function that is responsible for the decryption of the license	//in this case we hook the function that is responsible for the decryption of the license
//and we change the behavior to return a valid license	//and we change the behavior to return a valid license
// JUST FOR LEARNING PURPOSES, DON'T USE THIS TO CRACK SOFTWARE	// JUST FOR LEARNING PURPOSES, DON'T USE THIS TO CRACK SOFTWARE
//Adding hook	//Adding hook
const crypto = require("crypto");	const crypto = require("crypto");
const pubdec = crypto["publicDecrypt"];	const pubdec = crypto["publicDecrypt"];
delete crypto["publicDecrypt"];	delete crypto["publicDecrypt"];
let fingerprint, email, uuid, license, computerInfo = "";	let fingerprint, email, uuid, license, computerInfo = "";
let License = ""	
crypto.publicDecrypt = function (key, buffer) {	
    log("PubDec Key:" + key);	
    log("buf: " + buffer.toString('base64'));	
    if (buffer.slice(0, 26).compare(Buffer.from("CRACKED_BY_DIAMOND_HUNTERS")) == 0) {	
        License = buffer.toString('base64');	
        let ret = buffer.toString().replace("CRACKED_BY_DIAMOND_HUNTERS", "");	
        log("backdoor data,return : " + ret);	
        return Buffer.from(ret);	
    }	
    return pubdec(key, buffer);	
};	


const fetch = require("electron-fetch")	const fetch = require("electron-fetch")
fetch_bak = fetch['default'];	fetch_bak = fetch['default'];
@@ -42,14 +30,6 @@ fetch.default = async function fetch(url, options) {
        ret = await data.buffer();	        ret = await data.buffer();
        log('[fetch]Ret ' + ret.toString());	        log('[fetch]Ret ' + ret.toString());


        ret = Buffer.from('{"code":0,"retry":true,"msg":"' + Buffer.from("CRACKED_BY_DIAMOND_HUNTERS" + JSON.stringify(	
            {	
                "fingerprint": fingerprint,	
                "email": email,	
                "license": license,	
                "type": ""	
            })).toString('base64') + '"}');	
        log("replace ret: " + ret.toString());	
        data.text = () => {	        data.text = () => {
            return new Promise((resolve, reject) => {	            return new Promise((resolve, reject) => {
                resolve(ret.toString());	                resolve(ret.toString());
@@ -61,23 +41,7 @@ fetch.default = async function fetch(url, options) {
            });	            });
        };	        };
    }	    }
    if (url.indexOf('api/client/renew') != -1) {	
        ret = await data.buffer();	
        log('[fetch]Ret ' + ret.toString());	


        ret = Buffer.from('{"success":true,"code":0,"retry":true,"msg":"' + License + '"}');	
        log("replace ret: " + ret.toString());	
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
    return new Promise((resolve, reject) => {	    return new Promise((resolve, reject) => {
        resolve(data);	        resolve(data);
    });	    });
}	}
http = require("http")	http = require("http")
function log(str) {	function log(str) {
    http.get('http://127.0.0.1:3000/log?str=' + str, res => {	    http.get('http://127.0.0.1:3000/log?str=' + str, res => {
    }).on('error', err => {	    }).on('error', err => {
        console.log('Error: ', err.message);	        console.log('Error: ', err.message);
    });	    });
}	}
log = console.log;	log = console.log;
log('Hook Init')	log('Hook Init')
var Module = require('module');	var Module = require('module');
var originalRequire = Module.prototype.require;	var originalRequire = Module.prototype.require;
Module.prototype.require = function () {	Module.prototype.require = function () {
    log('Require ' + arguments[0])	    log('Require ' + arguments[0])
    if (arguments[0] == 'crypto') {	    if (arguments[0] == 'crypto') {
        log('Hooking crypto');	        log('Hooking crypto');
        return crypto;	        return crypto;
    }	    }
    if (arguments[0] == 'electron-fetch') {	    if (arguments[0] == 'electron-fetch') {
        log('Hooking electron-fetch');	        log('Hooking electron-fetch');
        return fetch;	        return fetch;
    }	    }
    return originalRequire.apply(this, arguments);	    return originalRequire.apply(this, arguments);
};	};
console.log = log	console.log = log
let validator = {	let validator = {
    set: function (target, key, value) {	    set: function (target, key, value) {
        if (key === 'log') {	        if (key === 'log') {
            log('console.log override blocked');	            log('console.log override blocked');
            return;	            return;
        }	        }
        target[key] = value;	        target[key] = value;
    }	    }
}	}
let proxy = new Proxy(console, validator);	let proxy = new Proxy(console, validator);
console = proxy	console = proxy
module.exports = fetch	module.exports = fetch
//hook finished
