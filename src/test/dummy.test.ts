import { test, describe } from "node:test";
import assert from "node:assert";
import { dummy } from "../src/utils/list_helper";
import { BlogType } from "../src/types/BlogType";

test("dummy returns", () => {
  const blogs: BlogType[] = [];

  const result = dummy(blogs);
  assert.strictEqual(result, 1);
});
