const { Router } = require('express');
const searchRoutes = Router();

const SearchController = require('../controllers/SearchController');
const searchController = new SearchController();

searchRoutes.get('/', searchController.show)

module.exports = searchRoutes