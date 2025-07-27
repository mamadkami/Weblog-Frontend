import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Heart, Reply, MoreVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  liked?: boolean;
}

interface CommentSystemProps {
  blogId: number;
}

const CommentSystem: React.FC<CommentSystemProps> = ({ blogId }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem(`comments_${blogId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Sample comments for demonstration
      const sampleComments: Comment[] = [
        {
          id: '1',
          author: 'Tech Enthusiast',
          content: 'Great article! This really helped me understand the concepts better.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 5,
          replies: [
            {
              id: '1-1',
              author: 'John Doe',
              content: 'Thanks for the feedback! Glad it was helpful.',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
              likes: 2,
              replies: []
            }
          ]
        },
        {
          id: '2',
          author: 'Developer Pro',
          content: 'I have a question about the implementation details. Could you provide more examples?',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          likes: 3,
          replies: []
        }
      ];
      setComments(sampleComments);
      localStorage.setItem(`comments_${blogId}`, JSON.stringify(sampleComments));
    }
  }, [blogId]);

  const saveComments = (updatedComments: Comment[]) => {
    setComments(updatedComments);
    localStorage.setItem(`comments_${blogId}`, JSON.stringify(updatedComments));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: user?.name || 'Anonymous',
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    setNewComment('');
  };

  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyContent.trim() || !isAuthenticated) return;

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: user?.name || 'Anonymous',
      content: replyContent.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    });

    saveComments(updatedComments);
    setReplyContent('');
    setReplyTo(null);
  };

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    const updatedComments = comments.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return { ...reply, likes: reply.likes + 1, liked: true };
            }
            return reply;
          })
        };
      } else if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1, liked: true };
      }
      return comment;
    });

    saveComments(updatedComments);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean; parentId?: string }> = ({ 
    comment, 
    isReply = false, 
    parentId 
  }) => (
    <div className={`${isReply ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {comment.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{comment.author}</p>
              <p className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</p>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-200 rounded">
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        
        <p className="text-gray-700 mb-3">{comment.content}</p>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleLike(comment.id, isReply, parentId)}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              comment.liked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${comment.liked ? 'fill-current' : ''}`} />
            <span>{comment.likes}</span>
          </button>
          
          {!isReply && isAuthenticated && (
            <button
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </button>
          )}
        </div>

        {replyTo === comment.id && (
          <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map(reply => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply={true} 
              parentId={comment.id} 
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="h-6 w-6 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
          <p className="text-gray-600 mb-4">Please login to join the discussion</p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Login to Comment
          </a>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSystem;