import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';
import Sparkline from '../Sparkline';
import testResp from '../../sample_resp.json';

const Background = styled.div`
  background-color: white;
  padding: 10px;
  float: left;
  min-width: 500px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 400;
  margin: 30px 0 50px 0;
  text-align: center;
`;

const SearchInput = styled.input`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  margin-bottom: 15px;
`

const HelperText = styled.div`
  font-size: 18px;
  margin: 30px;
`


class MonthSparklines extends React.Component {
  constructor(props) {
    super(props);
    const selectedCategory = 'Build: Generic Forward'
    this.state = {
      selectedCategory,
      sparklineUserData: [],
      transformedDataList: [],
      debug: false,
      filterString: '',
      hasLoaded: false
    }
  }

  componentDidMount() {
    this.getCalDataForUser('EMILY');
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
          this.setState({ hasLoaded: true })
          this.setState({ categories: res.categories });
          this.setState({ sparklineUserData: res.sparkline_user_data }, this.transformAllCategories);
        })
        .catch(console.log)
    } else {
      this.setState({ sparklineUserData: testResp }, this.transformAllCategories);
    }
  }

  transformAllCategories() {
    console.log('tihs.transformAllCategories');
    const names = this.state.sparklineUserData.map(d => d.name)
    let namesUnique = [...new Set(names)];
    if (this.state.filterString) {
      namesUnique = namesUnique.filter(n => n.toLowerCase().includes(this.state.filterString.toLowerCase()));
    }
    let transformedDataList = namesUnique.map(name => ({
      name: name,
      data: this.transformSingleCategory(name),
    }));

    transformedDataList.sort((a, b) => {
      let aMaxY = 0
      let bMaxY = 0
      const aData = a.data.filter(d => d.id === 'currentMonth')[0]
      aData.data.forEach(d => {
        if (d.y > aMaxY) {
          aMaxY = d.y
        }
      })
      
      const bData = b.data.filter(d => d.id === 'currentMonth')[0]
      bData.data.forEach(d => {
        if (d.y > bMaxY) {
          bMaxY = d.y
        }
      })
      console.log(`aMaxY=${aMaxY}, bMaxY=${bMaxY}`);
      return bMaxY - aMaxY
    });

    this.setState({
      transformedDataList,
    });
  }

  round(number, precision) {
    return Math.round(number*(10**precision))/(10**precision)
  }

  transformSingleCategory(category) {
    console.log('transformData', category);
    const lastMonthPoints = this.state.sparklineUserData
      .filter((i) => i.is_current_or_last_month === 'Last Month' && i.name === category)
      .map(i => (
        {
          x: i.day_of_month,
          y: this.round(i.cumulative_hours_in_month, 1)
        }
      ));

    const currentMonthPoints = this.state.sparklineUserData
      .filter((i) => i.is_current_or_last_month === 'This Month' && i.name === category)
      .map(i => (
        {
          x: i.day_of_month,
          y: this.round(i.cumulative_hours_in_month, 1)
        }
      ));
      const res = [
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

    // Get goal for category
    const cats = this.state.categories.filter(j => j.name === category)

    // If we defined a weekly goal for this canonical category, it is first element of this list
    if (cats.length > 0) {
      const goalHrsWeek = cats[0].goal_hrs_week

      const goalPoints = [];
      for (let i = currentMonthPoints[0].x; i < 30; i++) {
        const y = (i - currentMonthPoints[0].x) * goalHrsWeek / 7.0
        goalPoints.push({
          x: i,
          y: this.round(y, 1)
        });
      }

      res.push({
        id: 'goal',
        color: '#d1d8e0',
        data: goalPoints
      })
    }

    return res
  }

  renderSparkLines() {
    return this.state.transformedDataList.map(i => (
      <Sparkline
        key={`sparkline-${i.name}`}
        topic={i.name}
        data={i.data}
      />
    ));
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
        <SearchInput
          type="text" value={this.state.filterString} onChange={this.handleChange}
        />
        {this.state.transformedDataList.length > 0 ?
          this.renderSparkLines() :
          this.state.hasLoaded ?
            <HelperText>No Results :(</HelperText> :
            <HelperText>Loading...</HelperText>
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