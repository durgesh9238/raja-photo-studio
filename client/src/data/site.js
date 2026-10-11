// One place for every detail about the studio.
// Change a value here and it updates across the whole website.

export const site = {
  name: 'Raja Photo Studio',
  place: 'Badwara',
  years: 10,
  tagline: 'We photograph feelings, not poses.',

  phone: '9399958039',
  phoneDisplay: '+91 93999 58039',
  whatsapp: '919399958039',
  email: 'rajarajak@gmail.com',
  hours: '10:00 AM to 10:00 PM',
  mapsUrl: 'https://maps.app.goo.gl/Utk8uCwKVGoUbx8F7',

  // Social links. Instagram is real. Replace the Facebook and YouTube
  // links with the studio's own pages when they are ready.
  instagram: 'https://www.instagram.com/simply_rajaa___',
  instagramHandle: '@simply_rajaa___',
  facebook: 'https://www.facebook.com/',
  youtube: 'https://www.youtube.com/',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'films', label: 'Films' },
  { id: 'albums', label: 'Albums' },
  { id: 'packages', label: 'Packages' },
  { id: 'contact', label: 'Contact' },
];

export const eventTypes = [
  'Wedding',
  'Pre-wedding',
  'Engagement',
  'Candid or portrait shoot',
  'Maternity or kids',
  'Product or commercial',
  'Album or photo frame',
  'Something else',
];

// Prices are sample values for the demo. Edit freely.
export const packages = [
  {
    name: 'Shagun',
    days: '1 day',
    price: '35,000',
    note: 'For intimate celebrations',
    featured: false,
    features: [
      'Traditional photography and videography',
      '40 sheet premium album',
      'Edited highlight video',
      'All soft copies in a private online gallery',
      '1 lead photographer',
    ],
  },
  {
    name: 'Saptapadi',
    days: '2 days',
    price: '65,000',
    note: 'Most booked by families',
    featured: true,
    features: [
      'Candid, traditional photography and videography',
      'Cinematic highlight film',
      '3 custom Instagram reels',
      '50 sheet layflat album and a mini album for parents',
      'Drone coverage',
      'All soft copies in a private online gallery',
    ],
  },
  {
    name: 'Rajwada',
    days: '3 days',
    price: '1,10,000',
    note: 'The complete royal story',
    featured: false,
    features: [
      'Two cinematographers and two photographers',
      'Pre-wedding shoot included',
      'Full length wedding film and 5 reels',
      'Luxury box album with 2 mini albums',
      'Framed portrait and table calendar',
      'Drone coverage and a same-day preview',
    ],
  },
];
