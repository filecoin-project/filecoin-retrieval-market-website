
/**
 * Stylelint configuration.
 */

module.exports = {
  extends: '@untile/stylelint-config-untile',
  rules: {
    'selector-type-no-unknown': [true, {
      'ignoreTypes': ['$dummyValue']
    }]
  }
};
