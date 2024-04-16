import { test, describe } from "node:test";
import { strictEqual } from "node:assert";
import listHelper from "../src/utils/list_helper";

test("dummy returns", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  strictEqual(result, 1);
});
