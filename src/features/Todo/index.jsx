import { Route, Routes, useLocation } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

function TodoFeature(props) {
  const match = useLocation();
  console.log(match);
  console.log(match.pathname);
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
