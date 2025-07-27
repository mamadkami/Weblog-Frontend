import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BlogProvider } from './contexts/BlogContext';
import Header from './components/Header';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import Categories from './pages/Categories';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateEditBlog from './pages/admin/CreateEditBlog';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create" element={<CreateEditBlog />} />
              <Route path="/admin/edit/:id" element={<CreateEditBlog />} />
            </Routes>
          </div>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;