
/**
 * Radius size.
 */

const radiusSize = {
  big: [10, 5, 3],
  small: [5, 3, 1.5]
};

/**
 * Export `Node` type.
 */

export type Node = {
  connections?: string[],
  directionX?: number,
  directionY?: number,
  dotX: number,
  dotY: number,
  id: string,
  laterConnections?: string[],
  radius: number,
  type: 'node' | 'subnode'
}

/**
 * `BreakpointType` type.
 */

type BreakpointType = 'desktop' | 'tablet' | 'mobile';

/**
 * Get radius.
 */

function getRadius(type: BreakpointType, size: 'big' | 'small'): number {
  switch (type) {
    case 'tablet':
      return radiusSize[size][1];

    case 'mobile':
      return radiusSize[size][2];

    default:
      return radiusSize[size][0];
  }
}

/**
 * Export `defaultNodes`.
 */

export const defaultNodes = (breakpointType: BreakpointType): Node[] => [{
  dotX: 27,
  dotY: 184,
  id: '1.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['1.0'],
  dotX: 18,
  dotY: 155,
  id: '1.1',
  laterConnections: ['2.1', '3.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['1.0'],
  dotX: 0,
  dotY: 185,
  id: '1.2',
  laterConnections: ['1.1', '1.3', '2.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['1.0'],
  dotX: 9,
  dotY: 225,
  id: '1.3',
  laterConnections: ['3.4'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['3.0'],
  dotX: 57,
  dotY: 77,
  id: '2.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['2.0'],
  dotX: 2,
  dotY: 84,
  id: '2.1',
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['2.0'],
  dotX: 21,
  dotY: 52,
  id: '2.2',
  laterConnections: ['2.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['2.0'],
  dotX: 82,
  dotY: 2,
  id: '2.3',
  laterConnections: ['2.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['2.0'],
  dotX: 141,
  dotY: 43,
  id: '2.4',
  laterConnections: ['2.3', '5.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['1.0', '4.0'],
  dotX: 91,
  dotY: 148,
  id: '3.0',
  laterConnections: ['2.0'],
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['3.0'],
  dotX: 64,
  dotY: 128,
  id: '3.1',
  laterConnections: ['2.0', '2.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['3.0'],
  dotX: 84,
  dotY: 103,
  id: '3.2',
  laterConnections: ['2.0', '5.0', '5.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['3.0'],
  dotX: 115,
  dotY: 171,
  id: '3.3',
  laterConnections: ['3.4', '4.2', '4.3'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['3.0'],
  dotX: 95,
  dotY: 197,
  id: '3.4',
  laterConnections: ['4.3'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  dotX: 209,
  dotY: 159,
  id: '4.0',
  laterConnections: ['6.0'],
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['4.0'],
  dotX: 188,
  dotY: 138,
  id: '4.1',
  laterConnections: ['5.0', '6.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['4.0'],
  dotX: 154,
  dotY: 170,
  id: '4.2',
  laterConnections: ['4.3'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['4.0'],
  dotX: 214,
  dotY: 221,
  id: '4.3',
  laterConnections: ['4.4'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['4.0'],
  dotX: 254,
  dotY: 167,
  id: '4.4',
  laterConnections: ['8.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['4.0'],
  dotX: 147,
  dotY: 121,
  id: '5.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['5.0'],
  dotX: 119,
  dotY: 135,
  id: '5.1',
  laterConnections: ['3.0'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['5.0'],
  dotX: 145,
  dotY: 78,
  id: '5.2',
  laterConnections: ['6.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  dotX: 277,
  dotY: 105,
  id: '6.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['6.0'],
  dotX: 218,
  dotY: 115,
  id: '6.1',
  laterConnections: ['5.0', '6.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['6.0'],
  dotX: 226,
  dotY: 74,
  id: '6.2',
  laterConnections: ['7.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['6.0'],
  dotX: 296,
  dotY: 58,
  id: '7.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['7.0'],
  dotX: 241,
  dotY: 0,
  id: '7.1',
  laterConnections: ['2.4'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['7.0'],
  dotX: 309,
  dotY: 2,
  id: '7.2',
  laterConnections: ['7.1', '7.3', '10.3'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['7.0'],
  dotX: 325,
  dotY: 43,
  id: '7.3',
  laterConnections: ['10.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['6.0'],
  dotX: 384,
  dotY: 161,
  id: '8.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['8.0'],
  dotX: 327,
  dotY: 174,
  id: '8.1',
  laterConnections: ['4.3', '4.4', '9.5'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['8.0'],
  dotX: 294,
  dotY: 146,
  id: '8.2',
  laterConnections: ['6.0'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['8.0'],
  dotX: 340,
  dotY: 123,
  id: '8.3',
  laterConnections: ['8.4', '10.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['8.0'],
  dotX: 379,
  dotY: 90,
  id: '8.4',
  laterConnections: ['10.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['8.0'],
  dotX: 398,
  dotY: 111,
  id: '8.5',
  laterConnections: ['8.4', '9.2', '12.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['11.0'],
  dotX: 457,
  dotY: 199,
  id: '9.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['8.0', '9.0'],
  dotX: 416,
  dotY: 197,
  id: '9.1',
  laterConnections: ['9.5'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['9.0'],
  dotX: 437,
  dotY: 174,
  id: '9.2',
  laterConnections: ['12.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['9.0'],
  dotX: 482,
  dotY: 205,
  id: '9.3',
  laterConnections: ['13.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['9.0'],
  dotX: 489,
  dotY: 230,
  id: '9.4',
  laterConnections: ['9.3', '9.5', '13.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['9.0'],
  dotX: 445,
  dotY: 230,
  id: '9.5',
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['12.0'],
  dotX: 458,
  dotY: 33,
  id: '10.0',
  laterConnections: ['12.3', '14.1'],
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['10.0'],
  dotX: 399,
  dotY: 78,
  id: '10.1',
  laterConnections: ['10.2', '12.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['10.0'],
  dotX: 325,
  dotY: 76,
  id: '10.2',
  laterConnections: ['10.3'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['10.0'],
  dotX: 377,
  dotY: 33,
  id: '10.3',
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['10.0'],
  dotX: 531,
  dotY: 10,
  id: '10.4',
  laterConnections: ['14.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['9.0', '12.0'],
  dotX: 496,
  dotY: 152,
  id: '11.0',
  laterConnections: ['13.3'],
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['11.0'],
  dotX: 468,
  dotY: 157,
  id: '11.1',
  laterConnections: ['12.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  dotX: 506,
  dotY: 110,
  id: '12.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['12.0'],
  dotX: 445,
  dotY: 142,
  id: '12.1',
  laterConnections: ['12.2'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['12.0'],
  dotX: 433,
  dotY: 116,
  id: '12.2',
  laterConnections: ['12.3'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['12.0'],
  dotX: 464,
  dotY: 97,
  id: '12.3',
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['12.0'],
  dotX: 543,
  dotY: 182,
  id: '13.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['13.0'],
  dotX: 558,
  dotY: 197,
  id: '13.1',
  laterConnections: ['13.2', '13.4'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['13.0'],
  dotX: 491,
  dotY: 199,
  id: '13.2',
  laterConnections: ['13.3'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['13.0'],
  dotX: 508,
  dotY: 160,
  id: '13.3',
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['13.0'],
  dotX: 548,
  dotY: 138,
  id: '13.4',
  laterConnections: ['14.0'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['12.0'],
  dotX: 550,
  dotY: 89,
  id: '14.0',
  radius: getRadius(breakpointType, 'big'),
  type: 'node'
}, {
  connections: ['14.0'],
  dotX: 517,
  dotY: 76,
  id: '14.1',
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}, {
  connections: ['14.0'],
  dotX: 559,
  dotY: 62,
  id: '14.2',
  laterConnections: ['14.1'],
  radius: getRadius(breakpointType, 'small'),
  type: 'subnode'
}];
