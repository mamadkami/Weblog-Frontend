import React, { useState, useMemo } from 'react';
import { useBlog } from '../contexts/BlogContext';
import BlogCard from '../components/BlogCard';
import AdvancedSearch, { SearchFilters } from '../components/AdvancedSearch';
import NewsletterSignup from '../components/NewsletterSignup';
import { ChevronLeft, ChevronRight, Filter, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const { blogs } = useBlog();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    author: '',
    dateFrom: '',
    dateTo: '',
    tags: []
  });
  const blogsPerPage = 6;

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(blogs.map(blog => blog.category))];
    return cats;
  }, [blogs]);

  // Filter blogs by category
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Apply advanced search filters
    if (searchFilters.query) {
      const query = searchFilters.query.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (searchFilters.category) {
      filtered = filtered.filter(blog => blog.category === searchFilters.category);
    }

    if (searchFilters.author) {
      filtered = filtered.filter(blog => blog.author === searchFilters.author);
    }

    if (searchFilters.dateFrom) {
      filtered = filtered.filter(blog => blog.publishDate >= searchFilters.dateFrom);
    }

    if (searchFilters.dateTo) {
      filtered = filtered.filter(blog => blog.publishDate <= searchFilters.dateTo);
    }

    if (searchFilters.tags.length > 0) {
      filtered = filtered.filter(blog =>
        searchFilters.tags.some(tag => blog.tags.includes(tag))
      );
    }

    return filtered;
  }, [blogs, selectedCategory, searchFilters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    // Reset advanced search when changing category
    setSearchFilters({
      query: '',
      category: '',
      author: '',
      dateFrom: '',
      dateTo: '',
      tags: []
    });
  };

  const handleAdvancedSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    setSelectedCategory('All');
    setCurrentPage(1);
  };

  // Get trending posts (simulate with random selection)
  const trendingPosts = useMemo(() => {
    return blogs
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [blogs]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to TechBlog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover the latest insights in technology, development, and innovation.
            Stay ahead with expert articles and tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('latest-posts')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Articles
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8" id="latest-posts">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Latest Articles</h2>
            <button
              onClick={() => setShowAdvancedSearch(true)}
              className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Advanced Search</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {currentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found in this category.</p>
          </div>
        )}

        {/* Trending Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingPosts.map((blog) => (
              <div key={`trending-${blog.id}`} className="relative">
                <BlogCard {...blog} />
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Trending
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-12">
          <NewsletterSignup />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </main>

      {/* Advanced Search Modal */}
      <AdvancedSearch
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onSearch={handleAdvancedSearch}
      />
    </div>
  );
};

export default Home;