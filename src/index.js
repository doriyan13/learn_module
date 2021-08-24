import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'; // This is unique to React -  let css file to run in a js file!
import App from './App';

// Define the usage for express to be able to use API requests -
// const express = require('express');
// const app = express();
// app.use(express.json());

ReactDOM.render(<App />, document.getElementById('root'));