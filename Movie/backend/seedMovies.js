require('dotenv').config();
const connectDB = require('./config/database');
const Movie = require('./models/Movie');

/**
 * Sample movies to seed into the database.
 * Poster images use trusted https URLs (Unsplash) to ensure they load.
 */
const sampleMovies = [
  {
    title: 'lucky bhaskar',
    description: 'An astronaut copes with isolation and the mysteries beyond the stars.',
    genre: 'Sci-Fi',
    releaseDate: '2021-06-18',
    duration: 118,
    rating: 8.2,
    posterImage:
      'https://images.unsplash.com/photo-1444044205820-38f3ed106c10?auto=format&fit=crop&w=800&q=60',
    trailerUrl: 'https://www.youtube.com/watch?v=Kv5RKsqVe-Y',
  },
  {
    title: 'brahmastra',
    description: 'A fast-paced thriller about a courier on the run with a secret package.',
    genre: 'Thriller',
    releaseDate: '2019-10-11',
    duration: 105,
    rating: 7.4,
    posterImage:
      'https://images.unsplash.com/photo-149703262821-86f99bcd76bc?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'The Shawshank Redemption',
    description: 'A comedy that follows three friends trying to open a food truck.',
    genre: 'Comedy',
    releaseDate: '2020-05-22',
    duration: 95,
    rating: 6.8,
    posterImage:
      'https://images.unsplash.com/photo-1509644856822-5b0d2c0d3f0f?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Oppenheimer',
    description: 'A touching romance set against the neon-lit streets of Tokyo.',
    genre: 'Romance',
    releaseDate: '2018-02-14',
    duration: 125,
    rating: 7.9,
    posterImage:
      'https://images.unsplash.com/photo-1535930749823-1399327ce78f?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Forest of Whispers',
    description: 'A fantasy adventure where a young explorer finds an enchanted forest.',
    genre: 'Fantasy',
    releaseDate: '2022-11-02',
    duration: 132,
    rating: 8.5,
    posterImage:
      'https://images.unsplash.com/photo-1441974231824-c6227db76b6e?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'The Last Documentary',
    description: 'An intimate documentary about preserving endangered cultures.',
    genre: 'Documentary',
    releaseDate: '2017-09-10',
    duration: 82,
    rating: 8.0,
    posterImage:
      'https://images.unsplash.com/photo-1500534314825-a25ddb2bd429?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Animated Dreams',
    description: 'A family-friendly animated film about toys that come alive at night.',
    genre: 'Animation',
    releaseDate: '2016-07-08',
    duration: 89,
    rating: 7.1,
    posterImage:
      'https://images.unsplash.com/photo-1489599849826-2ee91cede3ba?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Documented Life',
    description: 'A dramatic exploration of modern family life and resilience.',
    genre: 'Drama',
    releaseDate: '2023-03-19',
    duration: 140,
    rating: 8.7,
    posterImage:
      'https://images.unsplash.com/photo-1500534314827-a25ddb2bd429?auto=format&fit=crop&w=800&q=60',
  },
];

const seed = async () => {
  try {
    await connectDB();

    const count = await Movie.countDocuments();
    if (count >= sampleMovies.length) {
      console.log('🟡 Movies collection already seeded. Skipping.');
      process.exit(0);
    }

    await Movie.insertMany(sampleMovies);
    console.log('✅ Seeded movies successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding movies:', error);
    process.exit(1);
  }
};

seed();
