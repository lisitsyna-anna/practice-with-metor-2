import css from './SharedLayout.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
export const SharedLayout = () => {
  const location = useLocation();
  const isDetailsPage = location.pathname.includes('details');

  return (
    <>
      <header>
        {!isDetailsPage && (
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? css.activeLink : css.baseLink
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    isActive ? css.activeLink : css.baseLink
                  }
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    isActive ? css.activeLink : css.baseLink
                  }
                >
                  Search
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
