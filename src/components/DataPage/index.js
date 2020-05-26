import React from 'react';
import styled from 'styled-components';
import MonthSparklines from '../MonthSparklines';

const BorderBackground = styled.div`
  background-color: #dcdde1;
  height: 100vh;
  font-size: 12px;
  color: #353b48;
  padding: 20px;
`;

const Component = ({ count, handleIncrementClick, handleDecrementClick }) => {
  return (
    <BorderBackground>
      <MonthSparklines />
    </BorderBackground>
  )
};

export default Component;