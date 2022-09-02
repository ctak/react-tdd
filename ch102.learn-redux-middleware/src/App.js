import React from 'react';
// import CounterContainer from './containers/CounterContainer';
import PostListContainer from './containers/PostListContainer';
import { Routes, Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
  // return <CounterContainer />;
  return (
    <>
      <Routes>
        <Route path="/" element={ <PostListPage /> } />
        <Route path="/:id" element={ <PostPage /> } />
      </Routes>
    </>
  );
}

export default App;
