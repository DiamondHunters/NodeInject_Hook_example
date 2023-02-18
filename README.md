# NodeInject_Hook_example
A hooking example for NodeInject

## About `hook.js`

#### WARNING

JUST FOR LEARNING! 

**PLEASE DO NOT ABUSE THIS SCRIPT CAPABILITY FOR THE PURPOSE OF INFRINGEMENT, AND YOU SHALL BEAR ALL CONSEQUENCES CAUSED BY YOUR ACTIONS.**


#### Usage

1. `git clone https://github.com/DiamondHunters/NodeInject.git`
2. Replace `hooklog.js` with `hook.js` in this repo (or use `no_embed` feature and set `NO_EMBED_HOOK_JS_PATH` to the path of `hook.js`)
3. Run `cargo build` or `cargo build --features no_embed` to build a type of executable (If you enabled `no_embed` feature, you need to copy `hook.js` to the same directory of executable)
4. Run the executable

If you need a fake license, you can run `cargo run` in `license-gen` directory

This fake license is not valid and just used for **testing**. Please do not use it for any other purpose.

#### Ability

- [x] make typora to activate with the generated activation code (Test passed in version 1.5.8 on Windows,1.4.7 on Ubuntu)
- [x] hook `console.log` to remote http server and block override
- [x] hook `electron-fetch` for sniffing request
- [ ] Full version compatibility (older version not using `electron-fetch` and may fail in the future)
- [ ] Multi os compatibility (not work in macOS)
