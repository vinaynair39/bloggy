export default (blogs, { text, sortBy }) => {
    return blogs.filter((blog) => {
      const textMatch = blog.title.toLowerCase().includes(text.toLowerCase());
      return textMatch;
    }).sort((a, b) => {
      if (sortBy === 'likes') {
        return a.likes < b.likes ? 1 : -1;
      }
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
    });
  
  };