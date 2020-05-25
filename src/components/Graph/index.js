import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';
import Sparkline from '../Sparkline';

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

const testData = [
  {
    "id": "japan",
    "color": "hsl(186, 70%, 50%)",
    "data": [
      {
        "x": 1,
        "y": 130
      },
      {
        "x": 3,
        "y": 240
      },
      {
        "x": 50,
        "y": 216
      },
      {
        "x": 51,
        "y": 216
      },
      {
        "x": 52,
        "y": 216
      }
    ]
  },
  {
    "id": "nomo",
    "color": "hsl(120, 70%, 50%)",
    "data": [
      {
        "x": 1,
        "y": 330
      },
      {
        "x": 3,
        "y": 340
      },
      {
        "x": 50,
        "y": 316
      },
      {
        "x": 51,
        "y": 316
      },
    ]
  }
]

class Graph extends React.Component {
  constructor(props) {
    super(props);
    const selectedCategory = 'Build: Generic Forward'
    this.state = { testData, selectedCategory }
  }

  componentDidMount() {
    console.log('mounted');
    this.fetchRoute('/api/v1/getcal?user_id=NOAH')

    // this.fetchRoute('http://api.darksky.net/v1/status.txt');
  }

  fetchRoute(route) {
    console.log('fetching ', route);
    fetch(route)
      .then(res => {
        console.log('res');
        console.log(res);
        return res.json()
      })
      .then((res) => {
        console.log(res);
        this.setState({ rawData: res }, this.transformData)
      })
      .catch(console.log)
  }

  transformData(data) {
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
        <Sparkline data={this.state.testData} />
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