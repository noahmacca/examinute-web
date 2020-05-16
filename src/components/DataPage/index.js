import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';

const BorderBackground = styled.div`
  background-color: #dcdde1;
  min-height: 100vh;
  font-size: 28px;
  color: #353b48;
  padding: 20px;
`;

const Button = styled.button`
  background-color: magenta;
`;


const Component = ({ count, handleIncrementClick, handleDecrementClick }) => (
  <BorderBackground>
    <h1>Make those personal goals happen! {count}</h1>
    <Button onClick={handleDecrementClick}>Up</Button>
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