import { useState } from 'react';
import axios from 'axios';

const NewPost = ({ handleSubmit }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleNewPost = async (e) => {
    e.preventDefault();
    const newPost = {
      title: postTitle,
      body: postBody,
      datetime: new Date().toISOString()
    };
    try {
      const response = await axios.post(`${process.env.VITE_BASE_URL}/posts`, newPost);
      handleSubmit(response.data.id, response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleNewPost}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;







