import { useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import productsApi from './api/productApi';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';
import Header from './components/Header';
import './App.css';
import ProductFeature from './features/Product';

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productsApi.getAll(params);
    };
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CounterFeature />} />
        <Route path="/todos/*" element={<TodoFeature />} />
        <Route path="/products/*" element={<ProductFeature />} />
        <Route path="/albums" element={<AlbumFeature />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
