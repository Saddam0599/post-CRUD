import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = ({ posts, handleEdit }) => {
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  useEffect(() => {
    if (post) {
      setPostTitle(post.title);
      setPostBody(post.body);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { id: post.id, title: postTitle, datetime: post.datetime, body: postBody, updated: post.updated };
    handleEdit(post.id, updatedPost);
  };

  return (
    <main className="NewPost">
      {post ? (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={handleSubmit}>
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
        </>
      ) : (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
        </>
      )}
    </main>
  );
};

export default EditPost;







