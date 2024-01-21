import React, { useState } from 'react';

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Comment created successfully:', data);
        setComment('');
      })
      .catch((error) => console.error('Error creating comment:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='py-2 gap-2 h-16 flex justify-center'>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='resize-none border rounded-xl w-full pl-2'
        />
        <button type="submit" className='bg-indigo-600 text-white px-5 rounded-full'>Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;