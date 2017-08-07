var path = require('path');

module.exports = {
  "extends": "eslint-config-airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.js"
      }
    }
  },
  "rules": {
    "func-names": 0,
    "eol-last": 0,
    "class-methods-use-this": 0,
    "comma-dangle": 0,
    "no-class-assign": 0,
    "no-console": 0,
    "no-prototype-builtins": 0,
    "no-confusing-arrow": 0,
    "no-return-assign": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 0,
    "import/no-duplicates": 0,
    "import/extensions": 0,
    "import/no-absolute-path": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default-member": 0,
    "react/no-unescaped-entities": 0,
    "react/require-default-props": 0,
    "react/no-extraneous-imports": 0,
    "react/no-extraneous-dependencies": 0,
    "react/no-unused-prop-types": 0,
    "react/no-array-index-key": 0,
    "react/no-danger": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-wrap-multilines": 0,
    "react/jsx-no-bind": [ 2, {
      "ignoreRefs": false,
      "allowArrowFunctions": true,
      "allowBind": true
    }],
  },
  "plugins": [
    "import",
    "react",
    "jsx-a11y"
  ]
}