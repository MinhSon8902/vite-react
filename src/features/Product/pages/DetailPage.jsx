import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper } from '@mui/material';
import ProductThumbnail from '../components/ProductThumbnail';
import { useParams } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';

function DetailPage(props) {
  const { productId } = useParams();
  const { product, loading } = useProductDetail(productId);
  if (loading) {
    return <Box>Loading</Box>;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '10px',
        paddingBottom: '10px',
      }}
    >
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid
              item
              sx={{
                width: '400px',
                padding: '10px',
                borderRight: '1px solid #e0e0e0',
              }}
            >
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item sx={{ flex: '1 1 0', padding: '10px' }}>
              <ProductInfo product={product} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

DetailPage.propTypes = {};

export default DetailPage;
