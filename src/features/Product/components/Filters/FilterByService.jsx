import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function FilterByService({ filters = {}, onChange }) {
  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };
  return (
    <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
      <Typography variant="subtitle2" sx={{ mb: '10px' }}>
        DỊCH VỤ
      </Typography>
      <ul style={{ listStyle: 'none', padding: '0px', margin: '0px' }}>
        {[
          { value: 'isPromotion', label: 'Có khuyến mãi' },
          { value: 'isFreeShip', label: 'Miễn phí vận chuyển' },
        ].map((service) => (
          <li key={service.value} style={{ marginTop: '5px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

export default FilterByService;
