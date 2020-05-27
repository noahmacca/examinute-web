import { ResponsiveLine } from '@nivo/line'
import React from 'react';
import styled from 'styled-components';

const GraphContainer = styled.div`
  float: left;
  width: 250px;
  padding: 15px;
`

const GraphTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 7px;
`;

const PlotContainer = styled.div`
  height: 150px;
  width: 250px;
`;

const StatsRow = styled.div`
  padding-top: 10px;
`

const StatElement = styled.div`
  padding: 0 12px;
  float: left;
`

const StatLabel = styled.div`
font-size: 8px;
font-weight: 400;
`

const StatVal = styled.div`
font-size: 12px;
font-weight: 200;
`

class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data }
  }

  renderStats() {
    const currentMonth = this.props.data.filter(i => i.id === 'currentInterval')
    const goal = this.props.data.filter(i => i.id === 'goal')
    let totalHrsCurrentMonth = 0;
    let diffFromGoal = 0;
    let haveGoal = false
    let weeklyGoal = 0;
    if (currentMonth.length > 0) {
      // Get total from last point
      const currentMonthCoords = currentMonth[0].data
      const lastDataCurrent = currentMonthCoords[currentMonthCoords.length - 1]
      totalHrsCurrentMonth = lastDataCurrent.y

      if (goal.length > 0) {
        haveGoal = true;

        // Diff between last value and goal
        const goalData = goal[0].data
        const matchingGoalDay = goalData.filter(i => i.x === lastDataCurrent.x)[0]
        diffFromGoal =  totalHrsCurrentMonth - matchingGoalDay.y

        // Weekly Goal
        weeklyGoal = goalData[7].y
      }
    }

    return (
      <StatsRow>
        <StatElement>
          <StatLabel>Current {this.props.intervalLabel}</StatLabel>
          <StatVal>{`${totalHrsCurrentMonth.toFixed(1)} hr`}</StatVal>
        </StatElement>
        {
          haveGoal ? 
            <StatElement>
              <StatLabel>Progress</StatLabel>
              <StatVal>{`${diffFromGoal.toFixed(1)} hr`}</StatVal>
            </StatElement> :
            null
        }
        {
          haveGoal ? 
            <StatElement>
              <StatLabel>Weekly Goal</StatLabel>
              <StatVal>{`${weeklyGoal.toFixed(0)} hr`}</StatVal>
            </StatElement> :
            null
        }
      </StatsRow>
    )
  }

  render() {
    return (
      <GraphContainer>
        <GraphTitle>{`${this.props.topic}`}</GraphTitle>
        <PlotContainer>
          <ResponsiveLine
            data={this.props.data}
            margin={{ top: 2, right: 0, bottom: 2, left: 0 }}
            xScale={{ type: 'linear' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors={d => d.color}
            // enableArea={d => (d.id === 'goal')}
            // colors={{ scheme: 'nivo' }}
            enablePoints={false}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderColor="black"
            pointLabel="y"
            pointLabelYOffset={-12}
            areaOpacity={0.3}
            useMesh={true}
            legends={[]}
            animate={false}
            />
        </PlotContainer>
          {this.renderStats()}
      </GraphContainer>
    );
  }
}

export default Sparkline;