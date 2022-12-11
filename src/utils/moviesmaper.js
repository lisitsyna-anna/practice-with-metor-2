export const moviesMaper = movies => {
  return movies.map(({ id, backdrop_path: img, vote_count: votes, title }) => ({
    id,
    img,
    votes,
    title,
    watched: false,
  }));
};
