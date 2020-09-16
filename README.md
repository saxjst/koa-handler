# Koa Handler

> Configure a koa server with a provided configuration

[![Build Status](https://travis-ci.org/saxjst/koa-handler.svg?branch=master)](https://travis-ci.org/saxjst/koa-handler)
[![Coverage Status](https://coveralls.io/repos/github/saxjst/koa-handler/badge.svg?branch=master)](https://coveralls.io/github/saxjst/koa-handler?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/841af7743a474bb61775/maintainability)](https://codeclimate.com/github/saxjst/koa-handler/maintainability)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/saxjst/koa-handler.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/saxjst/koa-handler/context:javascript)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)

## Install

```
$ npm install koa-handler
```

## Features

- Reuse configuration across projects (router, middleware, etc) with custom presets
- Automatically inject middlewares, context and routes to your server

## Usage

```js
const Koa = require('koa');
const serverLoader = require("koa-handler")(Koa);

// your own configuration
const { router1, router2 } = require("./modules/routers");
const db = require("./modules/db");
const preset1 = require("./modules/preset1");
const preset2 = require("./modules/preset2");

// configuration
const server_config = {
  routers: [router1, router2],
  ctx: { db }, // optional
  presets: [preset1, preset2] // optional
};

const server = serverLoader(server_config);

//  HTTP server listening
server.listen(config.SERVER_PORT, () => {
  console.info(`Server listening at ${config.SERVER_PORT}`);
});
```

## Create a preset

- A preset is nothing else than returning a object.
- The returned object can have three type of fields :
  - `routers`: an array of koa routers
  - `middlewares`: an array of koa middlewares
  - `ctx`: A Koa context object
  - all these fields are optional

**example :**

```js
const dummyPreset = () => ({
  ctx: { dummy: "dummy example" }
});
```

## API

### koaHandler(config) ⇒ <code>Object</code>

Configure a koa server with a provided configuration

**Returns**: `Object` - configured Koa server ready to by started

| Param               | Type                              | Default         | Description                                      |
| ------------------- | --------------------------------- | --------------- | ------------------------------------------------ |
| config              | <code>Object</code>               |                 | config object                                    |
| [config.routers]    | `Object[]` | `[]` | koa routers                                      |
| [config.middleware] | `Object[]` | `[]` | koa middlewares                                  |
| [config.ctx]        | `Object[]` | `[]` | Items that must be added into koa context        |
| [config.presets]    | `Object[]` | `[]` | preconfigured set of middleware, routers and ctx |

## License

MIT © [saxjst](https://saxjst.com)
