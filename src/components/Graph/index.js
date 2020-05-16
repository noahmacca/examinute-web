import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  margin: 20px 0;
  background-color: magenta;
  width: 700px;
  height: 300px;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const Component = ({ count, handleIncrementClick, handleDecrementClick }) => (
  <Background>
    <Title>Graph 1: My data over time {count}</Title>
    <button onClick={handleDecrementClick}>Up</button>
    <button onClick={handleIncrementClick}>Down</button>
  </Background>
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