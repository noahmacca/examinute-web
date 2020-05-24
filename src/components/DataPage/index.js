import { connect } from 'react-redux';
import React from 'react';
import styled from 'styled-components';
import Graph from '../Graph';
import Sparkline from '../Sparkline';

const BorderBackground = styled.div`
  background-color: #dcdde1;
  height: 100vh;
  font-size: 12px;
  color: #353b48;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 20px;
`;

const testData =
[
  {
    "id": "japan",
    "color": "hsl(186, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 130
      },
      {
        "x": "helicopter",
        "y": 240
      },
      {
        "x": "boat",
        "y": 216
      },
      {
        "x": "train",
        "y": 261
      },
      {
        "x": "subway",
        "y": 89
      },
      {
        "x": "bus",
        "y": 43
      },
      {
        "x": "car",
        "y": 290
      },
      {
        "x": "moto",
        "y": 58
      },
      {
        "x": "bicycle",
        "y": 296
      },
      {
        "x": "horse",
        "y": 159
      },
      {
        "x": "skateboard",
        "y": 125
      },
      {
        "x": "others",
        "y": 83
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(19, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 182
      },
      {
        "x": "helicopter",
        "y": 282
      },
      {
        "x": "boat",
        "y": 288
      },
      {
        "x": "train",
        "y": 222
      },
      {
        "x": "subway",
        "y": 13
      },
      {
        "x": "bus",
        "y": 160
      },
      {
        "x": "car",
        "y": 122
      },
      {
        "x": "moto",
        "y": 194
      },
      {
        "x": "bicycle",
        "y": 70
      },
      {
        "x": "horse",
        "y": 37
      },
      {
        "x": "skateboard",
        "y": 222
      },
      {
        "x": "others",
        "y": 137
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(80, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 93
      },
      {
        "x": "helicopter",
        "y": 135
      },
      {
        "x": "boat",
        "y": 77
      },
      {
        "x": "train",
        "y": 26
      },
      {
        "x": "subway",
        "y": 254
      },
      {
        "x": "bus",
        "y": 87
      },
      {
        "x": "car",
        "y": 240
      },
      {
        "x": "moto",
        "y": 225
      },
      {
        "x": "bicycle",
        "y": 180
      },
      {
        "x": "horse",
        "y": 293
      },
      {
        "x": "skateboard",
        "y": 242
      },
      {
        "x": "others",
        "y": 271
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(231, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 246
      },
      {
        "x": "helicopter",
        "y": 43
      },
      {
        "x": "boat",
        "y": 80
      },
      {
        "x": "train",
        "y": 39
      },
      {
        "x": "subway",
        "y": 80
      },
      {
        "x": "bus",
        "y": 66
      },
      {
        "x": "car",
        "y": 94
      },
      {
        "x": "moto",
        "y": 219
      },
      {
        "x": "bicycle",
        "y": 212
      },
      {
        "x": "horse",
        "y": 220
      },
      {
        "x": "skateboard",
        "y": 6
      },
      {
        "x": "others",
        "y": 199
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(19, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 165
      },
      {
        "x": "helicopter",
        "y": 111
      },
      {
        "x": "boat",
        "y": 158
      },
      {
        "x": "train",
        "y": 246
      },
      {
        "x": "subway",
        "y": 143
      },
      {
        "x": "bus",
        "y": 212
      },
      {
        "x": "car",
        "y": 83
      },
      {
        "x": "moto",
        "y": 168
      },
      {
        "x": "bicycle",
        "y": 52
      },
      {
        "x": "horse",
        "y": 88
      },
      {
        "x": "skateboard",
        "y": 43
      },
      {
        "x": "others",
        "y": 104
      }
    ]
  }
];

const Component = ({ count, handleIncrementClick, handleDecrementClick }) => {
  console.log(count);
  console.log(testData);
  return (
    <BorderBackground>
      <Title>Super cool time project {count}</Title>
      <button onClick={handleDecrementClick}>Down</button>
      <button onClick={handleIncrementClick}>Up</button>
      <Graph
        title='Hello'
        data={[1, 2, 3]}
      />
      <Sparkline data={testData} />
    </BorderBackground>
  )
};

const mapStateToProps = state => {
  return {
    count: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
    handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);