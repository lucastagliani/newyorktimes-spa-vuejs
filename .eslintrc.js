module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'prd' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'prd' ? 'error' : 'off',
    'no-await-in-loop': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
