import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';
import Sparkline from '../Sparkline';
import testResp from '../../sample_resp.json';

const Background = styled.div`
  background-color: white;
  padding: 10px;
  float: left;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 400;
  margin: 30px 0 50px 0;
  text-align: center;
`;

class MonthSparklines extends React.Component {
  constructor(props) {
    super(props);
    const selectedCategory = 'Build: Generic Forward'
    this.state = {
      selectedCategory,
      rawData: [],
      transformedDataList: [],
      debug: true,
      filterString: 'personal',
    }
  }

  componentDidMount() {
    this.getCalDataForUser('NOAH');
  }

  getCalDataForUser(userId) {
    const route = `/api/v1/getcal?user_id=${userId}`
    if (!this.state.debug) {
      console.log('fetching', route);
      fetch(route)
        .then(res => res.json())
        .then((res) => {
          console.log('got response for route', route);
          console.log(res)
          this.setState({ rawData: res }, this.transformAllCategories);
        })
        .catch(console.log)
    } else {
      console.log('debug');
      this.setState({ rawData: testResp }, this.transformAllCategories);
    }
  }

  transformAllCategories() {
    console.log('tihs.transformAllCategories');
    const names = this.state.rawData.map(d => d.name)
    let namesUnique = [...new Set(names)];
    if (this.state.filterString) {
      console.log('filtering by', this.state.filterString);
      namesUnique = namesUnique.filter(n => n.toLowerCase().includes(this.state.filterString.toLowerCase()));
    }
    const transformedDataList = namesUnique.map(name => ({
      name: name,
      data: this.transformSingleCategory(name),
    }));
    this.setState({
      transformedDataList,
    });
  }

  transformSingleCategory(category) {
    console.log('transformData', category);
    const lastMonthPoints = this.state.rawData
      .filter((i) => i.is_current_or_last_month === 'Last Month' && i.name === category)
      .map(i => (
        {
          x: i.day_of_month,
          y: i.cumulative_hours_in_month
        }
      ));

    const currentMonthPoints = this.state.rawData
      .filter((i) => i.is_current_or_last_month === 'This Month' && i.name === category)
      .map(i => (
        {
          x: i.day_of_month,
          y: i.cumulative_hours_in_month
        }
      ));

    return [
      {
        id: 'lastMonth',
        color: '#bdc3c7',
        data: lastMonthPoints
      },
      {
        id: 'currentMonth',
        color: '#e74c3c',
        data: currentMonthPoints
      }
    ]
  }

  renderSparkLines() {
    return this.state.transformedDataList.map(i => (
      <Sparkline
        key={`sparkline-${i.name}`}
        topic={i.name}
        data={i.data}
      />
    ))
  }

  handleChange = (e) => {
    // TODO comma delimited
    console.log('handleChange', e.target.value);
    this.setState({
      filterString: e.target.value
    }, this.transformAllCategories);
  }

  render() {
    // This is called whenever props or state is changed.
    return (
      <Background>
        <Title>Examinute</Title>
        <form>
          <label>
            Filter:
            <input type="text" value={this.state.filterString} onChange={this.handleChange} />
          </label>
        </form>
        {this.state.transformedDataList.length > 0 ?
          this.renderSparkLines() :
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