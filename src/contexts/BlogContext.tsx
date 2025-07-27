import React, { createContext, useContext, useState, useEffect } from 'react';

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  image: string;
}

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, 'id'>) => Promise<void>;
  updateBlog: (id: number, blog: Omit<Blog, 'id'>) => Promise<void>;
  deleteBlog: (id: number) => Promise<void>;
  getBlogById: (id: number) => Blog | undefined;
  searchBlogs: (query: string) => Blog[];
  getBlogsByCategory: (category: string) => Blog[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // دریافت داده‌ها از API هنگام بارگذاری اولیه
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://weblog-backend-cl78.onrender.com/api/articles');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // افزودن بلاگ جدید
  const addBlog = async (blogData: Omit<Blog, 'id'>) => {
    try {
      const response = await fetch('https://weblog-backend-cl78.onrender.com/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      const newBlog = await response.json();
      setBlogs([newBlog, ...blogs]);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  // به‌روزرسانی بلاگ
  const updateBlog = async (id: number, blogData: Omit<Blog, 'id'>) => {
    try {
      const response = await fetch(`https://weblog-backend-cl78.onrender.com/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      const updatedBlog = await response.json();
      setBlogs(blogs.map(blog => (blog.id === id ? updatedBlog : blog)));
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  // حذف بلاگ
  const deleteBlog = async (id: number) => {
    try {
      await fetch(`https://weblog-backend-cl78.onrender.com/api/articles/${id}`, {
        method: 'DELETE',
      });
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  // دریافت بلاگ بر اساس ID
  const getBlogById = (id: number) => {
    return blogs.find(blog => blog.id === id);
  };

  // جستجوی بلاگ‌ها
  const searchBlogs = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(lowercaseQuery) ||
      blog.content.toLowerCase().includes(lowercaseQuery) ||
      blog.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      blog.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  // فیلتر بلاگ‌ها بر اساس دسته‌بندی
  const getBlogsByCategory = (category: string) => {
    return blogs.filter(blog => blog.category === category);
  };

  const value = {
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    searchBlogs,
    getBlogsByCategory,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};