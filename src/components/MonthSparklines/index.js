import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';
import Sparkline from '../Sparkline';
import testResp from '../../sample_resp.json';

const Background = styled.div`
  margin: 20px 0;
  background-color: white;
  width: 700px;
  height: 300px;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
`;

class MonthSparklines extends React.Component {
  constructor(props) {
    super(props);
    const selectedCategory = 'Build: Generic Forward'
    this.state = {
      selectedCategory,
      rawData: [],
      debug: true
    }
  }

  componentDidMount() {
    if (!this.state.debug) {
      console.log('not debug mode');
      this.getCalDataForUser('NOAH')
    } else {
      console.log('debug mode');
      this.setState({ rawData: testResp }, this.transformData)
    }
  }

  getCalDataForUser(userId) {
    const route = `/api/v1/getcal?user_id=${userId}`
    console.log('fetching', route);
    fetch(route)
      .then(res => res.json())
      .then((res) => {
        console.log('got response for route', route);
        console.log(res)
        this.setState({ rawData: res }, this.transformData)
      })
      .catch(console.log)
  }

  transformData() {
    console.log('transformData');
    console.log(this.state);
    const lastMonthPoints = this.state.rawData
      .filter((i) => i.is_current_or_last_month === 'Last Month' && i.name === this.state.selectedCategory)
      .map(i => (
        {
          x: i.day_of_month,
          y: i.cumulative_hours_in_month
        }
      ));

    const currentMonthPoints = this.state.rawData
      .filter((i) => i.is_current_or_last_month === 'This Month' && i.name === this.state.selectedCategory)
      .map(i => (
        {
          x: i.day_of_month,
          y: i.cumulative_hours_in_month
        }
      ));
    this.setState({
      testData: [
        {
          id: 'lastMonth',
          color: 'hsl(186, 70%, 50%)',
          data: lastMonthPoints
        },
        {
          id: 'currentMonth',
          color: 'hsl(50, 70%, 50%)',
          data: currentMonthPoints
        }
      ]
    })
  }

  render() {
    console.log('render');
    console.log(this.state);
    return (
      <Background>
        <Title>Graph 1: My data over time</Title>
        {/*  */}
        {this.state.rawData.length > 0 ? 
          <Sparkline data={this.state.testData} /> :
          <div>Loading</div>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(MonthSparklines);