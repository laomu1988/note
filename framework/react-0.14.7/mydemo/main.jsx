var React = require('react'),ReactDOM = require('react-dom');

ReactDOM.render(
    <h1> Hello World! </h1>,
    document.getElementById('example')
);


/*


 $ npm install --save react react-dom babelify babel-preset-react
 $ browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js
 */
