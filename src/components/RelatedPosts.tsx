import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface RelatedPostsProps {
  currentBlogId: number;
  category: string;
  tags: string[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentBlogId, category, tags }) => {
  const { blogs } = useBlog();

  // Find related posts based on category and tags
  const relatedPosts = blogs
    .filter(blog => blog.id !== currentBlogId)
    .map(blog => {
      let score = 0;
      
      // Same category gets higher score
      if (blog.category === category) score += 3;
      
      // Shared tags get points
      const sharedTags = blog.tags.filter(tag => tags.includes(tag));
      score += sharedTags.length * 2;
      
      return { ...blog, relevanceScore: score };
    })
    .filter(blog => blog.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
      
      <div className="space-y-6">
        {relatedPosts.map(post => (
          <article key={post.id} className="group">
            <Link to={`/blog/${post.id}`} className="flex space-x-4 hover:bg-gray-50 rounded-lg p-4 transition-colors">
              <img
                src={post.image}
                alt={post.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h4>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {post.content.substring(0, 120)}...
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;