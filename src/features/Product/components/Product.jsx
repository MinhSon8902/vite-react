import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
  const navigate = useNavigate();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_URL;
  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body" component="h5">
        {product.name}
      </Typography>
      <Typography variant="body">
        <Box
          component="span"
          fontSize="16px"
          fontWeight="bold"
          marginRight="1px"
        >
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
