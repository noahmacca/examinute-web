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

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() }
  }

  componentDidMount() {
    console.log('mounted');
    this.fetchRoute('/published/2/R7z0NY0Ja-eATwYdxvL0Cj5_0suPQs9_NokawvmHwpTuh04vObEvNZuL3-mYKubUqej19L4ZXAETnqZqlGuUb0bkBON4r9c7vUIHp7Ba2S0');
    // this.fetchRoute('https://p01-calendars.icloud.com/published/published/2/R7z0NY0Ja-eATwYdxvL0Cj5_0suPQs9_NokawvmHwpTuh04vObEvNZuL3-mYKubUqej19L4ZXAETnqZqlGuUb0bkBON4r9c7vUIHp7Ba2S0');
    this.fetchRoute('/v1/status.txt');
    // this.fetchRoute('http://api.darksky.net/v1/status.txt');
  }

  fetchRoute(route) {
    console.log('fetching ', route);
    fetch(route)
      .then(res => {
        console.log('res');
        console.log(res);
        return res.text()
      })
      .then((text) => {
        console.log(text);
        this.setState({ data: text })
      })
      .catch(console.log)
  }

  render() {
    return (
      <Background>
        <Title>Graph 1: My data over time</Title>
      </Background>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIncrementClick: () => dispatch({ type: 'GRAPH_INCREMENT' }),
    handleDecrementClick: () => dispatch({ type: 'GRAPH_DECREMENT' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);