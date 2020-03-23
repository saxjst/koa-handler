const dummyFunction = require(".");

describe("dummyFunction tests", () => {
  test("if dummyFunction is called then it must be defined", () => {
    expect(typeof dummyFunction).toBe("function");
  });
});
