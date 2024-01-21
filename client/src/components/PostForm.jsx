import React, { useState } from 'react';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post created successfully:', data);
        setTitle('');
        setContent('');
        setImageUrl('');
      })
      .catch((error) => console.error('Error creating post:', error));
  };

  return (
    <div>
      <div className='flex justify-center'>
        <div className='p-10'>
            <h2 className='text-center text-3xl text-zinc-600'>Create a New Post</h2>
            <div className='bg-indigo-600 w-5 h-1 rounded-full'></div>
        </div>
      </div>
      <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className='rounded-xl p-2 shadow-md bg-white flex justify-center gap-2'>
            
            <div className='flex justify-start gap-2'>
                <label className='text-indigo-600'>Title :</label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-60 h-10 pl-2'
                />
            </div>

            <div className='flex justify-start gap-2'>
                <label className='text-indigo-600'>Content :</label>
                <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='resize-none w-60 h-10 pl-2'
                />
            </div>

            <div className='flex justify-start gap-2'>
                <label className='text-indigo-600'>Image URL :</label>
                <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className='w-60 h-10 pl-2'
                />
            </div>
            <div>
                <button type="submit" className='bg-indigo-600 text-white rounded-md p-2 shadow-md'>Post</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;