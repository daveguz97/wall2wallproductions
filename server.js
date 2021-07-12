if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripePublicKey = process.env.PUBLIC_KEY;
const stripeSecretKey = process.env.SECRET_KEY;

console.log(stripePublicKey, stripeSecretKey);

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);

console.log(`listening on port ${process.env.PORT}`);
