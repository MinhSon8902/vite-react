import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };
  return (
    <Tabs
      value={currentSort}
      onChange={handleSortChange}
      textColor="primary"
      aria-label="basic tabs example"
    >
      <Tab label="Giá từ thấp tới cao" value="salePrice:ASC"></Tab>
      <Tab label="Giá từ cao tới thấp" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default ProductSort;
