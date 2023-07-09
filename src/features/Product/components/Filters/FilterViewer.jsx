import { Box, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import categoryApi from '../../../../api/categoryApi';

function FilterViewer({ filters = {}, onChange = null }) {
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);
  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        listStyle: 'none',
        margin: '2 0',
      }}
    >
      {visibleFilters.map((x) => (
        <li key={x.id} style={{ marginInline: '10px' }}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilter = x.onToggle(filters);
                    onChange(newFilter);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilter = x.onRemove(filters);
                    onChange(newFilter);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao Hàng Miễn Phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = {
        ...filters,
      };
      if (filters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters['isFreeShip'] = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: (filters) => 'Có Khuyến Mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters) => {
      try {
        async function getNameCategory() {
          const data = await categoryApi.get(filters['category.id']);
          return data.name;
        }
        getNameCategory();
      } catch (error) {
        console.log('Failed to fetch api getLabel');
      }
    },
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('category.id'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: null,
  },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

export default FilterViewer;
