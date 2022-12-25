import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Home from 'pages/Home/Home';
import Events from 'pages/Events/Events';
import EventSubPage from 'pages/EventSubPage/EventSubPage';
import Search from 'pages/Search/Search';
import EventDetailsPage from 'pages/EventDetailsPage/EventDetailsPage';
import Test from './Test/Test';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />}>
          <Route path=":id" element={<EventSubPage />} />
        </Route>
        <Route path="events/:id/details" element={<EventDetailsPage />} />
        <Route path="search" element={<Search />}>
          <Route path=":id" element={<EventSubPage />} />
        </Route>
        <Route path="search/:id/details" element={<EventDetailsPage />}>
          <Route path="test" element={<Test />} />
        </Route>
      </Route>
    </Routes>
  );
};
