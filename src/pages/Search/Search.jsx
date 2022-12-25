import { useSearchParams, Link, useLocation, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchEventByName } from 'services/eventsAPI';

const Search = () => {
  const [events, setEvents] = useState([]);
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useSearchParams();
  const query = searchQuery.get('query');

  const handleSubmit = e => {
    e.preventDefault();
    setSearchQuery({ query: e.target.elements.query.value });
    e.target.reset();
  };

  useEffect(() => {
    if (query === '' || query === null) {
      return;
    }
    fetchEventByName(query).then(setEvents);
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search events</button>
      </form>
      {events.length !== 0 && (
        <>
          <ul>
            {events.map(({ id, name }) => (
              <li key={id}>
                <Link to={`${id}`} state={{ from: location }}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Search;
