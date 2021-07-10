const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const port = process.env.PORT

const app = express();

console.log(`Your port is ${port}`)