import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogPost from './pages/BlogPost.jsx';

function TitleReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/') {
      document.title = 'Raja Photo Studio, Badwara | Wedding, Pre-wedding and Portrait Photography';
    }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    // reducedMotion="user": people who turn off animations in their device settings get a calmer site
    <MotionConfig reducedMotion="user">
      <TitleReset />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<BlogPost />} />
      </Routes>
      <Footer />
    </MotionConfig>
  );
}
