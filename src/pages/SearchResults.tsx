import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import BlogCard from '../components/BlogCard';
import { Search } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchBlogs } = useBlog();
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      // Simulate search delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (query.trim()) {
        const searchResults = searchBlogs(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    };

    performSearch();
  }, [query, searchBlogs]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          </div>
          
          {query && (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600">
                Searching for: <span className="font-semibold text-gray-900">"{query}"</span>
              </p>
              {!isLoading && (
                <p className="text-sm text-gray-500 mt-1">
                  Found {results.length} {results.length === 1 ? 'article' : 'articles'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* No Query */}
        {!query && !isLoading && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Search Query</h2>
            <p className="text-gray-600">Enter a search term to find articles.</p>
          </div>
        )}

        {/* No Results */}
        {query && !isLoading && results.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-4">
              We couldn't find any articles matching "{query}".
            </p>
            <div className="text-sm text-gray-500">
              <p>Try searching for:</p>
              <ul className="mt-2 space-y-1">
                <li>• Different keywords or phrases</li>
                <li>• More general terms</li>
                <li>• Check spelling and try again</li>
              </ul>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;