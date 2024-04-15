import { test, describe } from "node:test";
import assert from "node:assert";
import { totalLikes, favoriteBlog } from "../src/utils/list_helper";
import { BlogType } from "../src/types/BlogType";

describe("favorite blog", () => {
  const blogs = [
    {
      _id: "661be637bcf69da96e1c0674",
      title: "sample title",
      author: "John Doe",
      url: "http://localhost:690000",
      likes: 3,
      __v: 0,
    },
    {
      _id: "661bea9eb7c5a38254971551",
      title: "sample title",
      author: "John Doe",
      url: "http://localhost:690000",
      likes: 25,
      __v: 0,
    },
    {
      _id: "661beaf413b4a678c6dbeb4a",
      title: "sample title",
      author: "John Doe",
      url: "http://localhost:690000",
      likes: 35,
      __v: 0,
    },
  ];

  test("list the favorite blog", () => {
    const result = favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      _id: "661beaf413b4a678c6dbeb4a",
      title: "sample title",
      author: "John Doe",
      url: "http://localhost:690000",
      likes: 35,
      __v: 0,
    });
  });
});
