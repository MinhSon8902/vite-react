import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@mui/material';
import categoryApi from '../../../../api/categoryApi';

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list ', error);
      }
    })();
  }, []);
  const handleCategoryClick = (category) => {
    if (onChange) onChange(category.id);
  };
  return (
    <Box>
      <Typography variant="subtitle2">Danh Mục Sản Phẩm</Typography>
      <ul
        style={{
          listStyle: 'none',
          padding: '0',
          margin: '10px 0 0',
          textAlign: 'left',
        }}
      >
        {categoryList.map((category) => (
          <li
            key={category.id}
            onClick={() => {
              handleCategoryClick(category);
            }}
            style={{ margin: '5px 0 5px' }}
          >
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByCategory;
