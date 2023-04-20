import { Route, Routes, useLocation, useMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

function TodoFeature(props) {
  const match = useLocation();
  return (
    <div>
      <p>Hello Todo</p>
      <Routes>
        <Route path={match.pathname} element={<ListPage />} />
        <Route path={`${match.pathname}/:todoId`} element={<DetailPage />} />
        <Route element={<NotFound />} />
      </Routes>
    </div>
  );
}

TodoFeature.propTypes = {};

export default TodoFeature;
