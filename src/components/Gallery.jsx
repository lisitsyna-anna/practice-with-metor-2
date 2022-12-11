export const Gallery = ({ movies, onDelete, openModal, changeWatched }) => {
  return (
    <>
      <ul>
        {movies.map(({ id, title, img, votes, watched }) => (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {votes}</p>
            <p>
              Watched:
              <span onClick={() => changeWatched(id)}>{String(watched)}</span>
            </p>
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
            <button
              type="button"
              onClick={() => openModal({ src: img, alt: title })}
            >
              Show poster
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
