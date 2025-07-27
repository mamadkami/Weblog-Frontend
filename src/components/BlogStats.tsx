import React from 'react';
import { TrendingUp, Eye, Clock, ThumbsUp } from 'lucide-react';

interface BlogStatsProps {
  views?: number;
  readTime?: number;
  likes?: number;
  trending?: boolean;
}

const BlogStats: React.FC<BlogStatsProps> = ({ 
  views = Math.floor(Math.random() * 1000) + 100,
  readTime = Math.floor(Math.random() * 10) + 3,
  likes = Math.floor(Math.random() * 50) + 5,
  trending = Math.random() > 0.7
}) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500">
      {trending && (
        <div className="flex items-center space-x-1 text-orange-600">
          <TrendingUp className="h-4 w-4" />
          <span className="font-medium">Trending</span>
        </div>
      )}
      
      <div className="flex items-center space-x-1">
        <Eye className="h-4 w-4" />
        <span>{views.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <Clock className="h-4 w-4" />
        <span>{readTime} min read</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <ThumbsUp className="h-4 w-4" />
        <span>{likes}</span>
      </div>
    </div>
  );
};

export default BlogStats;