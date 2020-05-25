import { ResponsiveLine } from '@nivo/line'
import React from 'react';
import styled from 'styled-components';

const GraphContainer = styled.div`
  float: left;
  margin: 15px;
  width: 250px;
  height: 150px;
  padding: 10px;
`

const GraphTitle = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 20px;
  text-align: center;
`;

class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data }
  }

  render() {
    console.log('Sparkline');
    console.log(this.props.data);
    return (
      <GraphContainer>
        <GraphTitle>{this.props.topic}</GraphTitle>
        <ResponsiveLine
          data={this.props.data}
          margin={{ top: 5, right: 0, bottom: 40, left: 0 }}
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
      </GraphContainer>
    );
  }
}

export default Sparkline;