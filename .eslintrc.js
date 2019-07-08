module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "react-native/react-native": true,
    },
    //"extends": "eslint:recommended",

    'extends': 'airbnb',
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    'rules': {
        "indent": ["error", 4],
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off'
    },
};