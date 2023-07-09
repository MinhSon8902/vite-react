import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productsApi from '../../../api/productApi';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

function ListPage(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }));
  // useEffect(() => {
  //   navigate({
  //     pathname: location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [navigate, filters, location]);

  useEffect(() => {
    try {
      async function fetchData() {
        const { data, pagination } = await productsApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      }
      fetchData();
    } catch (error) {
      console.log('Failed to fetch product list', error);
    }
    setLoading(false);
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
  };

  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }));
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }));
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilter = (newFilters) => {
    // setFilters(newFilters);
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item sx={{ width: '250px' }}>
            <Paper elevation={0}>
              {' '}
              <ProductFilter
                filters={queryParams}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>
          <Grid item sx={{ flex: '1 1 0' }}>
            <ProductSort
              currentSort={queryParams._sort}
              onChange={handleSortChange}
            />
            <FilterViewer filters={queryParams} onChange={setNewFilter} />
            <Paper elevation={0}>
              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'center',
                  marginTop: '10px',
                  paddingBottom: '10px',
                }}
              >
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
