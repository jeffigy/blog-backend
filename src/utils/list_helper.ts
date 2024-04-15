import { BlogType } from "../types/BlogType";

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined; // Return undefined if the array is empty
  }

  return blogs.reduce((prevHighest, currentPost) => {
    return currentPost.likes > (prevHighest ? prevHighest.likes : 0)
      ? currentPost
      : prevHighest;
  }, blogs[0]);
};

export { dummy, totalLikes, favoriteBlog };
