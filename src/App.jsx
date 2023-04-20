import { useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import productsApi from './api/productApi';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.color || 'green'};
`;

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productsApi.getAll(params);
      console.log(productList);
    };
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Title color="red">HEADING</Title>

      <div>
        <p>
          <NavLink to={'/albums'}>Albums</NavLink>
        </p>
        <p>
          <NavLink to={'/todos'}>Todo</NavLink>
        </p>
        <p>
          <NavLink to={'/counter'}>Counter</NavLink>
        </p>
      </div>
      <Routes>
        <Route path="/" render={() => <Route to="/" />} />
        <Route
          path="/post-list/:postId"
          render={() => <Route to="/posts/:postId" />}
        />
        <Route path="/counter" element={<CounterFeature />} />
        <Route path="/todos" element={<TodoFeature />} />
        <Route path="/albums" element={<AlbumFeature />} />

        <Route element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
