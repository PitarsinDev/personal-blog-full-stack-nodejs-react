import React, { useState, useEffect } from 'react';

import CommentForm from './CommentForm';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const fetchComments = (postId) => {
    fetch(`http://localhost:3001/api/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: data } : post
          )
        );
      })
      .catch((error) =>
        console.error(`Error fetching comments for post ${postId}:`, error)
      );
  };

  return (
    <div className='flex justify-center pt-10'>
      <div className='w-10/12'>
        <div className='flex justify-center'>
            {posts.map((post) => (
                <div className='bg-white shadow-md p-2 rounded-xl max-w-4xl'>
                        <div key={post.id}>
                        <h3 className='text-3xl text-indigo-600'>{post.title}</h3>
                        <p className='text-zinc-400 py-2'>{post.content}</p>
                        {post.image_url && <img className='rounded-md' src={post.image_url} alt={post.title} />}

                        {post.comments && (
                            <div>
                            <h4>Comments</h4>
                            {post.comments.map((comment) => (
                                <p key={comment.id}>{comment.comment}</p>
                            ))}
                            </div>
                        )}
                        <div className='p-2'> 
                            <button onClick={() => fetchComments(post.id)} className='rounded-full text-white px-5 bg-indigo-600'>
                                Load Comments
                            </button>
                        </div>
                        </div>
                        <CommentForm />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;