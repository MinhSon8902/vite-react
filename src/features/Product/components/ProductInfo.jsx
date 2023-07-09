import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { formatPrice } from '../../../utils/common';

function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;
  return (
    <Box>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" sx={{ margin: '10px 0' }}>
        {shortDescription}
      </Typography>
      <Box sx={{ padding: '10px', backgroundColor: '#c4c4c4' }}>
        <Box component="span">{formatPrice(salePrice)}</Box>
        <Box component="span">{originalPrice}</Box>
        <Box component="span">{promotionPercent}</Box>
      </Box>
    </Box>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.object,
};

export default ProductInfo;
