import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import About from '../components/About.jsx';
import Services from '../components/Services.jsx';
import Gallery from '../components/Gallery.jsx';
import Break from '../components/Break.jsx';
import Films from '../components/Films.jsx';
import Albums from '../components/Albums.jsx';
import Packages from '../components/Packages.jsx';
import Reviews from '../components/Reviews.jsx';
import BlogPreview from '../components/BlogPreview.jsx';
import Contact from '../components/Contact.jsx';
import Feedback from '../components/Feedback.jsx';

export default function Home() {
  const location = useLocation();
  const [pkg, setPkg] = useState('');

  // coming back from a blog page: scroll to the section that was asked for
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(t);
  }, [location.state]);

  const choosePackage = (name) => {
    setPkg(name);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Gallery />
      <Break />
      <Films />
      <Albums />
      <Packages onChoose={choosePackage} />
      <Reviews />
      <BlogPreview />
      <Contact selectedPackage={pkg} />
      <Feedback />
    </main>
  );
}
