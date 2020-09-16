const R = require("ramda");
const groupValuesByKey = require("group-values-by-key");

/** Merge nested objects in a single object
 *
 * @param {Array[Object[]] || Object[]} objects objects to merge
 * @return {Object} the new merged object
 * @api private
 */
const nestedMergeAll = R.pipe(
  R.flatten,
  R.mergeAll
);

/** Configure a koa server with a provided configuration
 *
 * @param {Object} Koa - Koa builder
 * @param {Object} config config
 * @param {Object[]} [config.routers=[]] - koa routers
 * @param {Object[]} [config.middleware=[]]-  koa middlewares
 * @param {Object[]} [config.ctx={}] - Items that must be added into koa context
 * @param {Object[]} [config.presets=[]] - preconfigured set of middleware, routers and ctx
 * @return {Object} configured Koa server ready to by started
 * @api public
 */
const koaHandler = Koa => ({
  routers = [],
  middlewares = [],
  ctx = {},
  presets = []
}) => {
  const app = new Koa();

  const groupedItems = groupValuesByKey(presets);

  // Load added context in app
  const allCtx = nestedMergeAll([ctx, groupedItems.ctx]);

  R.keys(allCtx).forEach(key => {
    app.context[key] = allCtx[key];
  });

  // Load middlewares and routers in app
  R.flatten([groupedItems.middlewares, middlewares]).forEach(middleware =>
    app.use(middleware)
  );
  R.flatten([routers, groupedItems.routers]).forEach(router =>
    app.use(router.routes())
  );

  return app;
};

module.exports = koaHandler;
