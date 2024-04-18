const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");
const helper = require("./test_helper");
const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Identifier is id", async () => {
    const blogs = await helper.blogsInDb();
    const blog = blogs.some((obj) => "id" in obj);
    assert.strictEqual(blog, true);
  });
});

after(async () => {
  await mongoose.connection.close();
});
