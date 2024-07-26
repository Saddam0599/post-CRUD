import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import EditPost from './components/EditPost';
import Feed from './components/Feed';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Missing from './components/Missing';
import Nav from './components/Nav';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_BASE_URL}/posts`);
      setPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.VITE_BASE_URL}/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id, updatedPost) => {
    try {
      await axios.put(`${process.env.VITE_BASE_URL}/posts/${id}`, updatedPost);
      setPosts(posts.map(post => (post.id === id ? updatedPost : post)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Header title="My Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/" render={() => <Home posts={posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))} />} />
        <Route path="/post/:id" render={() => <PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/edit/:id" render={() => <EditPost posts={posts} handleEdit={handleEdit} />} />
        <Route path="/about" component={About} />
        <Route path="/new" render={() => <NewPost handleSubmit={handleEdit} />} />
        <Route component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
