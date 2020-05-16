import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';

const BorderBackground = styled.div`
  background-color: #dcdde1;
  height: 100vh;
  font-size: 12px;
  color: #353b48;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 18px;
  color: blue;
  font-weight: 200;
  margin-bottom: 20px;
`;

const Component = ({ count, handleIncrementClick, handleDecrementClick }) => (
  <BorderBackground>
    <Title>Super cool time project {count}</Title>
    <button onClick={handleDecrementClick}>Up</button>
    <button onClick={handleIncrementClick}>Down</button>
  </BorderBackground>
);

const mapStateToProps = state => {
  return {
    count: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
    handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);