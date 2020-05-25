import { ResponsiveLine } from '@nivo/line'
import React from 'react';

class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data }
  }

  render() {
    console.log('sparkline render');
    console.log(this.props);
    console.log(this.state);
    return (
      <ResponsiveLine
        data={this.props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        // axisBottom={true}
        // axisLeft={true}
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: 'nivo' }}
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
    );
  }
}

export default Sparkline;