const express = require('express');
const cors = require('cors');


const BOOKSTORE = require('./controllers/BookController');

const app = express();
app.use(cors());
app.use('/', BOOKSTORE);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
