import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Heading from './Heading.jsx';
import { blogsByLang, formatDate } from '../data/blogs.js';

export const LangTabs = ({ lang, onChange }) => (
  <div className="filters" role="group" aria-label="Choose language">
    <button type="button" className={`chip ${lang === 'en' ? 'is-on' : ''}`} aria-pressed={lang === 'en'} onClick={() => onChange('en')}>
      English
    </button>
    <button type="button" className={`chip ${lang === 'hi' ? 'is-on' : ''}`} aria-pressed={lang === 'hi'} onClick={() => onChange('hi')}>
      हिन्दी
    </button>
  </div>
);

export function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="post" lang={post.lang}>
      <span className="post__img">
        <img src={post.cover} alt="" loading="lazy" />
      </span>
      <span className="post__meta">
        {formatDate(post.date, post.lang)} &nbsp;|&nbsp; {post.readTime}
      </span>
      <h3 className="post__title">{post.title}</h3>
      <p className="post__excerpt">{post.excerpt}</p>
    </Link>
  );
}

export default function BlogPreview() {
  const [lang, setLang] = useState('en');
  const posts = blogsByLang(lang);

  return (
    <section className="section section--dark blogpreview" id="blog">
      <div className="container">
        <div className="gallery__head">
          <Heading lines={['Notes from', 'behind the lens.']} />
          <LangTabs lang={lang} onChange={setLang} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="posts"
            key={lang}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {posts.map((p) => (
              <PostCard post={p} key={p.slug} />
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="blogpreview__more">
          <Link className="btn btn--ghost" to="/blog">
            Read all articles
          </Link>
        </p>
      </div>
    </section>
  );
}
