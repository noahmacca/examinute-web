import { ResponsiveLine } from '@nivo/line'
import React from 'react';

class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data }
  }

  // componentDidMount() {
  //   console.log('mounted');
  //   this.fetchRoute('/published/2/R7z0NY0Ja-eATwYdxvL0Cj5_0suPQs9_NokawvmHwpTuh04vObEvNZuL3-mYKubUqej19L4ZXAETnqZqlGuUb0bkBON4r9c7vUIHp7Ba2S0');
  //   // this.fetchRoute('https://p01-calendars.icloud.com/published/published/2/R7z0NY0Ja-eATwYdxvL0Cj5_0suPQs9_NokawvmHwpTuh04vObEvNZuL3-mYKubUqej19L4ZXAETnqZqlGuUb0bkBON4r9c7vUIHp7Ba2S0');
  //   this.fetchRoute('/v1/status.txt');
  //   // this.fetchRoute('http://api.darksky.net/v1/status.txt');
  // }

  render() {
     return (
    <ResponsiveLine
        data={this.state.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
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