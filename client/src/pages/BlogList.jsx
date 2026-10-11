import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Heading from '../components/Heading.jsx';
import { LangTabs, PostCard } from '../components/BlogPreview.jsx';
import { blogsByLang } from '../data/blogs.js';

export default function BlogList() {
  const [params, setParams] = useSearchParams();
  const lang = params.get('lang') === 'hi' ? 'hi' : 'en';
  const posts = blogsByLang(lang);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog | Raja Photo Studio, Badwara';
  }, []);

  return (
    <main className="page">
      <div className="container">
        <div className="gallery__head">
          <Heading as="h1" lines={['Notes from', 'behind the lens.']} />
          <LangTabs lang={lang} onChange={(l) => setParams(l === 'hi' ? { lang: 'hi' } : {})} />
        </div>
        <div className="posts posts--page">
          {posts.map((p) => (
            <PostCard post={p} key={p.slug} />
          ))}
        </div>
      </div>
    </main>
  );
}
