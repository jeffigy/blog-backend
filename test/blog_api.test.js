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

  describe("addition of a blog", () => {
    test("succeed with adding new data", async () => {
      const blogEntry = {
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        likes: 1,
        url: "https://search.worldcat.org/title/don-quixote/oclc/1020679308",
      };

      await api
        .post("/api/blogs")
        .send(blogEntry)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const fetchedBlogs = await helper.blogsInDb();
      assert.strictEqual(fetchedBlogs.length, helper.initialBlogs.length + 1);
    });

    test("if likes is missing, it will default to 0", async () => {
      const blogEntry = {
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        url: "https://search.worldcat.org/title/don-quixote/oclc/1020679308",
      };

      const res = await api
        .post("/api/blogs")
        .send(blogEntry)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(res.body.likes, 0);
    });

    test("if title or url is missing, it will return status 400", async () => {
      const blogEntry = {
        author: "Miguel de Cervantes",
        likes: 1,
        url: "https://search.worldcat.org/title/don-quixote/oclc/1020679308",
      };

      await api.post("/api/blogs").send(blogEntry).expect(400);
      const fetchedBlogs = await helper.blogsInDb();
      assert.strictEqual(fetchedBlogs.length, helper.initialBlogs.length);
    });
  });
  describe("deletion of a blog", () => {
    test("succeeds if id is valid ", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete("/api/blogs").send(blogToDelete);
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const contents = blogsAtEnd.map((blog) => blog.id);

      assert(!contents.includes(blogToDelete.id));
    });

    test("returns 400 on wrong id", async () => {
      const wrongId = "661beaf413b4a678c6dbeb4b";

      await api.delete("/api/blogs").send(wrongId).expect(400);
    });
  });

  describe("updating a blog", () => {
    test("succeed on updating", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogtoUpdate = blogsAtStart[0];

      blogtoUpdate.title = "new title";
      await api.patch("/api/blogs").send(blogtoUpdate).expect(200);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd[0].title, blogtoUpdate.title);
    });

    test("returns 404 on missing id, title, or url", async () => {
      const blogs = await helper.blogsInDb();
      const blogToUpdate = blogs[0];

      delete blogToUpdate.title;

      await api.patch("/api/blogs").send(blogToUpdate).expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
