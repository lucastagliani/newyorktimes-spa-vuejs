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
    'no-use-before-define': ['error', { functions: false }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
