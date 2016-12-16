module.exports = {

  canvas: {
    width: 30,
    height: 20,
    resolution: 20,
    radius: 9,
    color: '#fff'
  },

  snake: {
    content: [
      {
        x: 3,
        y: 1
      }, {
        x: 2,
        y: 1
      }, {
        x: 1,
        y: 1
      }
    ],

    color: '#1ABC9C'
  },

  food: {
    color: '#D23D46'
  },

  animations: {
    speed: 200
  },

  storage: {
    key: 'snakeRecord'
  }
};