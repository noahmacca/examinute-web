import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';
import Sparkline from '../Sparkline';
import testResp from '../../sample_resp.json';

const INTERVAL_CONSTANTS = {
    WEEKLY: 'weekly',
    MONTHLY: 'monthly'
}

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

const Subtitle = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin: 8px
`;

const SearchInput = styled.input`
  display: block;
  fonst-size: 10px;
  width: 250px;
  margin: 8px;
`

const HelperText = styled.div`
  font-size: 18px;
  margin: 30px;
`

const ModeDropdown = styled.select`
  display: block;
  font-size: 11px;
  width: 150px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  padding: .6em 1.4em .5em .8em;
  box-sizing: border-box;
  margin: 6px;
  border: 1px solid #aaa;
  border-radius: .5em;
  background-color: #fff;
  outline: none;
`


class MonthSparklines extends React.Component {
    constructor(props) {
        super(props);
        const selectedCategory = 'Build: Generic Forward'
        this.state = {
            selectedCategory,
            sparklineUserData: {},
            interval: INTERVAL_CONSTANTS.WEEKLY,
            transformedDataList: [],
            userIds: [],
            debug: false,
            filterString: '',
            hasLoaded: false,
            selectedUserId: 'Emily',
            lastUpdatedTime: ''
        }
    }

    componentDidMount() {
        // TODO: There's a better way to get query params with router (?)
        let queryParams = new URLSearchParams(window.location.search);
        let userId = queryParams.get('user_id');

        // TODO: Fetch valid user ids from tomatojuicer instead of hardcoding
        const validUserIds = ['Emily', 'Noah'];
        if (userId && validUserIds.includes(userId)) {
            // setState() does not immediately mutate; it creates a pending state transition
            // for the function to be executed after the state change occurs, pass it in as a callback.
            this.setState({ selectedUserId: userId }, this.getCalDataForUser);
        } else {
            this.getCalDataForUser();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
      }

    getCalDataForUser() {
        const route = `/api/v1/getcal?user_id=${this.state.selectedUserId}`
        if (!this.state.debug) {
            console.log('fetching', route);
            fetch(route)
                .then(res => res.json())
                .then((res) => {
                    console.log('got response for route', route);
                    console.log(res)
                    this.setState({
                        hasLoaded: true,
                        categories: res.categories,
                        sparklineUserData: res.sparkline_user_data,
                        userIds: res.user_ids,
                        lastUpdatedTime: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
                    }, this.transformAllCategories);
                    this.intervalID = setTimeout(this.getCalDataForUser.bind(this), 5 * 60 * 1000);
                })
                .catch(console.log)
        } else {
            this.setState({ sparklineUserData: testResp }, this.transformAllCategories);
        }
    }

    transformAllCategories() {
        const names = this.state.sparklineUserData[this.state.interval].map(d => d.name)
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
            const aData = a.data.filter(d => d.id === 'currentInterval')[0]
            aData.data.forEach(d => {
                if (d.y > aMaxY) {
                    aMaxY = d.y
                }
            })

            const bData = b.data.filter(d => d.id === 'currentInterval')[0]
            bData.data.forEach(d => {
                if (d.y > bMaxY) {
                    bMaxY = d.y
                }
            })
            return bMaxY - aMaxY
        });

        this.setState({
            transformedDataList,
        });
    }

    round(number, precision) {
        return Math.round(number * (10 ** precision)) / (10 ** precision)
    }

    transformSingleCategory(category) {
        const lastIntervalPoints = this.state.sparklineUserData[this.state.interval]
            .filter((i) => i.is_current_or_last === 'Previous' && i.name === category)
            .map(i => (
                {
                    x: i.day_indexed + 1,
                    y: this.round(i.cumulative_hours, 1)
                }
            ));

        const currentIntervalPoints = this.state.sparklineUserData[this.state.interval]
            .filter((i) => i.is_current_or_last === 'Current' && i.name === category)
            .map(i => (
                {
                    x: i.day_indexed + 1,
                    y: this.round(i.cumulative_hours, 1)
                }
            ));

        lastIntervalPoints.unshift({ x: 0, y: 0 });
        currentIntervalPoints.unshift({ x: 0, y: 0 });

        const res = [
            {
                id: 'lastInterval',
                color: '#fae8c7',
                data: lastIntervalPoints
            },
            {
                id: 'currentInterval',
                color: '#e74c3c',
                data: currentIntervalPoints
            }
        ]

        // Get goal for category
        const cats = this.state.categories.filter(j => j.name === category)

        // If we defined a weekly goal for this canonical category, it is first element of this list
        if (cats.length > 0) {
            const goalHrsWeek = cats[0].goal_hrs_week
            const nDays = this.state.interval === INTERVAL_CONSTANTS.WEEKLY ? 7 : 30;

            const goalPoints = [];
            for (let i = currentIntervalPoints[0].x - 1; i <= nDays; i++) {
                const y = (i - currentIntervalPoints[0].x) * goalHrsWeek / 7.0
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
        const intervalLabel = this.state.interval === INTERVAL_CONSTANTS.WEEKLY ? "Week" : "Month"
        return this.state.transformedDataList.map(i => (
            <Sparkline
                key={`sparkline-${i.name}`}
                intervalLabel={intervalLabel}
                topic={i.name}
                data={i.data}
            />
        ));
    }

    handleChangeFilterBar = (e) => {
        // TODO comma delimited
        console.log('handleChange', e.target.value);
        this.setState({
            filterString: e.target.value
        }, this.transformAllCategories);
    }

    handleChangeUserPicker = (e) => {
        console.log('user change', e.target.value);
        this.setState({
            selectedUserId: e.target.value,
            hasLoaded: false,
            sparklineUserData: {},
            transformedDataList: []
        }, this.getCalDataForUser);
    }

    handleChangeIntervalPicker = (e) => {
        this.setState({
            interval: e.target.value
        }, this.transformAllCategories);
    }

    render() {
        // This is called whenever props or state is changed.
        return (
            <Background>
                <Title>Examinute</Title>
                <Subtitle>Last Updated {this.state.lastUpdatedTime}</Subtitle>
                <SearchInput
                    type="text" value={this.state.filterString} onChange={this.handleChangeFilterBar}
                />
                <ModeDropdown value={this.state.selectedUserId} onChange={this.handleChangeUserPicker}>
                    {this.state.userIds.map(e => <option key={`option-${e}`} value={e}>{e}</option>)}
                </ModeDropdown>
                <ModeDropdown value={this.state.interval} onChange={this.handleChangeIntervalPicker}>
                    <option value={INTERVAL_CONSTANTS.WEEKLY}>Weekly</option>
                    <option value={INTERVAL_CONSTANTS.MONTHLY}>Monthly</option>
                </ModeDropdown>
                {
                    this.state.transformedDataList.length > 0
                        ? this.renderSparkLines()
                        : this.state.hasLoaded
                            ? <HelperText>No Results :(</HelperText>
                            : <HelperText>Loading...</HelperText>
                }
            </Background >
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
