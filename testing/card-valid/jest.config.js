// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    "\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    '^.+.(svg)$': 'jest-svg-transformer',
  },
  testEnvironment: "jsdom",
};
