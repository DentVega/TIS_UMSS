// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', 'babel-preset-expo'],
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "throwIfNamespace": false, // defaults to true
        "runtime": "automatic", // defaults to classic
        "importSource": "custom-jsx-library" // defaults to react
      }
    ]
  ]
};
