import { Component } from 'react';

import { Button } from './Button';
import { Gallery } from './Gallery';
import { Modal } from './Modal/Modal';
import { getTrendingMovies } from 'services/moviesAPI';
import { moviesMaper } from 'utils/moviesmaper';

export class App extends Component {
  state = {
    movies: [],
    isGalleryOpen: false,
    isLoading: false,
    page: 1,
    error: null,
    currentImg: null,
  };

  componentDidUpdate(_, prevState) {
    const { isGalleryOpen, page } = this.state;
    if (
      (prevState.isGalleryOpen !== isGalleryOpen && isGalleryOpen) ||
      (prevState.page !== page && isGalleryOpen)
    ) {
      this.fetchMovies();
    }

    if (prevState.isGalleryOpen !== isGalleryOpen && !isGalleryOpen) {
      this.setState({ movies: [] });
    }
  }

  toggleGallery = () => {
    this.setState(prevState => ({
      isGalleryOpen: !prevState.isGalleryOpen,
    }));
  };

  fetchMovies = () => {
    const { page } = this.state;
    this.setState({ isLoading: true });

    getTrendingMovies(page)
      .then(({ data: { results } }) =>
        this.setState(prevState => ({
          movies: [...prevState.movies, ...moviesMaper(results)],
        }))
      )
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  deleteMovie = movieId => {
    this.setState(prevState => ({
      movies: prevState.movies.filter(({ id }) => id !== movieId),
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = img => {
    this.setState({ currentImg: img });
  };

  closeModal = () => {
    this.setState({ currentImg: null });
  };

  changeWatched = movieId => {
    this.setState(prevState => ({
      movies: prevState.movies.map(movie => {
        if (movie.id === movieId) {
          return { ...movie, watched: !movie.watched };
        }

        return movie;
      }),
    }));
  };

  render() {
    const { movies, isGalleryOpen, currentImg } = this.state;
    return (
      <>
        <Button
          text={isGalleryOpen ? 'Hide movies' : 'Show movies'}
          handleClick={this.toggleGallery}
        />
        {isGalleryOpen && (
          <>
            <Gallery
              movies={movies}
              onDelete={this.deleteMovie}
              openModal={this.openModal}
              changeWatched={this.changeWatched}
            />
            <Button text="Load more" handleClick={this.loadMore} />
          </>
        )}
        {currentImg && (
          <Modal currentImg={currentImg} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
