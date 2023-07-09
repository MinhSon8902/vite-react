import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ListPage from './pages/Listpage';
import { Box } from '@mui/material';
import DetailPage from './pages/DetailPage';

function ProductFeature(props) {
  return (
    <Box sx={{ padding: 4 }}>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/:productId" element={<DetailPage />} />
      </Routes>
    </Box>
  );
}

ProductFeature.propTypes = {};

export default ProductFeature;
