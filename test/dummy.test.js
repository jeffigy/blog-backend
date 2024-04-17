const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../src/utils/list_helper");

test("dummy returns", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});
