require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

router.get('/showBooks', async (req, res) => {
  
  console.log('hi')

});


module.exports = router;
