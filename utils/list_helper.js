const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  return blogs.reduce((prevHighest, currentBlog) => {
    return currentBlog.likes > (prevHighest ? prevHighest.likes : 0);
  }, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
