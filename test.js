const koaHandler = require(".");

describe("koaHandler tests", () => {
  test("if koaHandler is called then it must be defined", () => {
    expect(typeof koaHandler).toBe("function");
  });
});
