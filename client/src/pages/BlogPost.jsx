import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBlog, blogsByLang, formatDate } from '../data/blogs.js';
import { PostCard } from '../components/BlogPreview.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlog(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = post ? `${post.title} | Raja Photo Studio` : 'Article not found | Raja Photo Studio';
  }, [post]);

  if (!post) {
    return (
      <main className="page">
        <div className="container article__missing">
          <h1>We could not find that article.</h1>
          <Link className="btn btn--gold" to="/blog">
            Back to the blog
          </Link>
        </div>
      </main>
    );
  }

  const more = blogsByLang(post.lang).filter((b) => b.slug !== post.slug).slice(0, 2);
  const hi = post.lang === 'hi';

  return (
    <main className="page">
      <article className="article" lang={post.lang}>
        <div className="container container--narrow">
          <Link className="article__back" to={hi ? '/blog?lang=hi' : '/blog'}>
            {hi ? 'सभी लेख' : 'All articles'}
          </Link>
          <p className="article__meta">
            {formatDate(post.date, post.lang)} &nbsp;|&nbsp; {post.readTime}
          </p>
          <h1 className="article__title">{post.title}</h1>
          <p className="article__lead">{post.excerpt}</p>
        </div>

        <div className="container container--wide">
          <img className="article__cover" src={post.cover} alt="" />
        </div>

        <div className="container container--narrow article__body">
          {post.body.map((b, i) => {
            if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>;
            if (b.type === 'quote') return <blockquote key={i}>{b.text}</blockquote>;
            return <p key={i}>{b.text}</p>;
          })}

          <div className="article__cta">
            <p>{hi ? 'अपनी शादी की कहानी हमें सौंपना चाहते हैं?' : 'Ready to tell your own story with us?'}</p>
            <button
              type="button"
              className="btn btn--gold"
              onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
            >
              {hi ? 'अपनी तारीख़ बुक करें' : 'Book your date'}
            </button>
          </div>
        </div>

        {more.length > 0 && (
          <div className="container article__more">
            <h2 className="article__morehead">{hi ? 'और पढ़िए' : 'Keep reading'}</h2>
            <div className="posts">
              {more.map((p) => (
                <PostCard post={p} key={p.slug} />
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
