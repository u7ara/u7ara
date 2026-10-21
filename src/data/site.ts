/**
 * Single source of truth for site-level content.
 * TODO: replace every placeholder below with your own details.
 */
export const site = {
  name: 'Dipta',
  // TODO: your one-line role / location, shown under the greeting.
  title: 'Financial Data Analyst',
  location: 'East Java, Indonesia',
  description: 'Personal site and writing.',
  url: 'u7ara.netlify.app',
  email: 'adiptabagasss@gmail.com',

  socials: [
    // TODO: replace with your profile URLs.
    { label: 'LinkedIn', href: 'https://linkedin.com/in/adiptabagas' },
    { label: 'Letterboxd', href: 'https://letterboxd.com/u7ara' },
    { label: 'GitHub', href: 'https://github.com/u7ara' },
  ],

  // TODO: paste the share link of your CV PDF on Google Drive.
  // Set sharing to "Anyone with the link". The Download button derives its
  // direct-download URL from this link automatically.
  cv: {
    view: 'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'CV', href: '/cv' },
  ],
};

export type Site = typeof site;
