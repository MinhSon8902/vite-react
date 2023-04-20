import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';
import styles from './styles.module.css';
import { Button } from '@mui/material';

function CounterFeature() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const handleIncrease = () => {
    const action = increase();
    dispatch(action);
  };

  const handleDecrease = () => {
    const action = decrease();
    dispatch(action);
  };

  return (
    <div className={styles.counter}>
      Counter: {counter}
      <div>
        <Button className={styles.button} onClick={handleIncrease}>
          Increase
        </Button>
        <Button className={styles.button} onClick={handleDecrease}>
          Decrease
        </Button>
      </div>
    </div>
  );
}

CounterFeature.propTypes = {};

export default CounterFeature;
