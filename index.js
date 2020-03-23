const R = require("ramda");

const addValuesByKey = (groups, objects) => key => {
  // eslint-disable-next-line no-param-reassign
  groups[key] = R.filter(Boolean, R.pluck(key, objects));
};

/** group values of two objects by their key
 *
 * @param {Object[]} objects - array of object
 * @return {Object} object grouping values
 * @api private
 * @example
 *
 *    groupValuesByKey({a:2}, {a:3, b:1}) // => { a: [ 2, 3 ], b: [ 1 ] }
 *
 */
const groupValuesByKey = objects => {
  const keys = R.pipe(
    R.map(R.keys),
    R.flatten,
    R.uniq
  )(objects);
  const groups = R.pipe(
    // eslint-disable-next-line no-underscore-dangle
    R.pickAll(R.__, {}),
    R.map(() => [])
  )(keys);

  keys.forEach(addValuesByKey(groups, objects));

  return groups;
};

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
const init = Koa => ({
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

module.exports = init;
