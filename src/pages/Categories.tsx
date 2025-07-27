import React from 'react';
import { useBlog } from '../contexts/BlogContext';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight } from 'lucide-react';

const Categories: React.FC = () => {
  const { blogs } = useBlog();

  // Get categories with counts
  const categoryStats = blogs.reduce((acc, blog) => {
    acc[blog.category] = (acc[blog.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryStats).map(([name, count]) => ({
    name,
    count,
    description: getCategoryDescription(name),
    color: getCategoryColor(name)
  }));

  function getCategoryDescription(category: string): string {
    const descriptions: Record<string, string> = {
      'Technology': 'Latest trends and innovations in technology',
      'Design': 'UI/UX design principles and best practices',
      'Backend': 'Server-side development and architecture',
      'Mobile': 'Mobile app development and frameworks',
      'Security': 'Cybersecurity and best practices',
      'AI': 'Artificial Intelligence and machine learning'
    };
    return descriptions[category] || 'Explore articles in this category';
  }

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'Technology': 'bg-blue-100 text-blue-800 border-blue-200',
      'Design': 'bg-purple-100 text-purple-800 border-purple-200',
      'Backend': 'bg-green-100 text-green-800 border-green-200',
      'Mobile': 'bg-orange-100 text-orange-800 border-orange-200',
      'Security': 'bg-red-100 text-red-800 border-red-200',
      'AI': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our articles organized by topics and find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/?category=${encodeURIComponent(category.name)}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${category.color}`}>
                  <Tag className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {category.count} {category.count === 1 ? 'article' : 'articles'}
                </span>
                <span className="text-blue-600 font-medium text-sm group-hover:underline">
                  View Articles
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Our Content</h2>
          <p className="text-blue-100 mb-6 text-lg">
            We have {blogs.length} articles across {categories.length} categories
          </p>
          <Link
            to="/"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Browse All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;