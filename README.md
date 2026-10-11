# Raja Photo Studio, Badwara (full stack website)

React (Vite) website + Express and MongoDB server.

## 1. Run the website (client)

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## 2. Run the server (booking and feedback forms)

You need MongoDB. Either install it on your computer, or make a free cluster on MongoDB Atlas.

```bash
cd server
npm install
cp .env.example .env      # on Windows: copy .env.example .env
npm run dev
```

Open `.env` and fill in `MONGO_URI`. For email alerts also fill `EMAIL_USER` and `EMAIL_PASS`
(a Gmail address and its App Password). Email is optional; forms are saved to MongoDB either way.

Keep both terminals open. The website talks to the server on its own (Vite forwards `/api` to port 5000).

Check the server: http://localhost:5000/api/health

## 3. Where to change things

| What | File |
| --- | --- |
| Phone, email, hours, Instagram, Facebook, YouTube, Maps link | `client/src/data/site.js` |
| Packages and prices | `client/src/data/site.js` |
| Photos (add, remove, categories, captions) | `client/src/data/photos.js` |
| Client reviews (these are SAMPLES, replace them) | `client/src/data/reviews.js` |
| Blog articles (English and Hindi) | `client/src/data/blogs.js` |
| Counters (500+ weddings, 800+ albums) | `client/src/components/About.jsx` |
| Colours and fonts | top of `client/src/styles.css` |
| Hero video (silent, loops) | `client/public/videos/hero.mp4` |
| Films with sound | `client/public/videos/film-*.mp4` and the list in `client/src/components/Films.jsx` |

## 4. Before going live

- Replace the sample reviews, sample prices and sample counters with real ones.
- Put the real Facebook and YouTube links in `site.js`.
- For hosting, build the website with `npm run build` (inside `client`) and set `VITE_API_URL`
  to your server address. Set `CLIENT_URL` in the server `.env` to your website address.

## Notes

- Photo 4 from the original folder was left out because it has another name written on it.
- Both videos were saved sideways by the phone; they have been rotated upright and compressed.
