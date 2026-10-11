// Every photo on the site lives here. To add a photo:
// 1. copy the file into /public/images
// 2. add a line below with the right category.

const img = (n) => `/images/p${String(n).padStart(2, '0')}.jpg`;

export const photos = [
  { id: 1, src: img(1), cat: 'bridal', alt: 'Bride smiling through a bright pink veil with her hand near her chin', label: 'Through the veil' },
  { id: 13, src: img(13), cat: 'couple', alt: 'Engagement photo of a couple exchanging rings', label: 'Engaged' },
  { id: 7, src: img(7), cat: 'portrait', alt: 'Bridal portrait with a heavy maang tikka against a magenta backdrop', label: 'Magenta light' },
  { id: 5, src: img(5), cat: 'bridal', alt: 'Bride in a red lehenga adjusting her dupatta at night', label: 'Evening glow' },
  { id: 11, src: img(11), cat: 'couple', alt: 'Couple showing their henna-decorated hands towards the camera', label: 'Hands and henna' },
  { id: 8, src: img(8), cat: 'portrait', alt: 'Bride looking up through a sheer veil against a pink backdrop', label: 'Behind the net' },
  { id: 9, src: img(9), cat: 'bridal', alt: 'Bride with a wide, joyful smile in a red and gold lehenga', label: 'Pure joy' },
  { id: 14, src: img(14), cat: 'couple', alt: 'Couple sharing a red rose', label: 'The red rose' },
  { id: 10, src: img(10), cat: 'portrait', alt: 'Bride seated in a velvet outfit and silver jewellery in warm red light', label: 'Velvet and silver' },
  { id: 3, src: img(3), cat: 'bridal', alt: 'Bride looking down, framed by flowing pink fabric', label: 'The quiet moment' },
  { id: 15, src: img(15), cat: 'couple', alt: 'Bride looking down with her partner smiling beside her', label: 'Side by side' },
  { id: 12, src: img(12), cat: 'portrait', alt: 'Bride covering her smile with henna-painted hands', label: 'Hidden smile' },
  { id: 6, src: img(6), cat: 'bridal', alt: 'Bride with eyes closed touching her earring under city lights', label: 'City lights' },
  { id: 2, src: img(2), cat: 'bridal', alt: 'Bride laughing with her hand on her cheek, red chooda and gold jewellery', label: 'A shy laugh' },
  { id: 16, src: img(16), cat: 'portrait', alt: 'Portrait of a bride beneath a red veil, with a second framed photo inside', label: 'Two frames' },
];

export const photoById = (id) => photos.find((p) => p.id === id);
export const pic = (id) => img(id);

export const categories = [
  { key: 'all', label: 'All frames' },
  { key: 'bridal', label: 'Bridal' },
  { key: 'portrait', label: 'Portraits' },
  { key: 'couple', label: 'Couples' },
];
