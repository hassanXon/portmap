const express = require('express');
const isEmpty = require('lodash/isEmpty');
const ports = require('./data/ports');

/**
 * Will return a list of all ports
 *
 * Query string:
 *  type (optional)- 'port' or 'cruise'
 *
 *  bounding box query args (optional) are compatible with https://www.npmjs.com/package/boundingbox
 *  minlat / maxlat / minlon / maxlon - minimum & maximum latitude & longnitude respectively the full
 *                                      set is required in order to filter
 *
 * */
function getPorts(req, res) {
  if (isEmpty(req.query)) return res.json(ports);

  let result = ports;

  const byBounds = (req.query.minlat && req.query.maxlat && req.query.minlon && req.query.maxlat);
  if (byBounds) {
    result = result.filter((port) => {
      const minlat = parseFloat(req.query.minlat);
      const maxlat = parseFloat(req.query.maxlat);
      const minlon = parseFloat(req.query.minlon);
      const maxlon = parseFloat(req.query.maxlon);

      return (port.latitude >= minlat && port.latitude <= maxlat) &&
        (port.longitude >= minlon && port.longitude <= maxlon);
    });
  }

  if (req.query.type) {
    result = result.filter((port) => {
      return (req.query.type) ? (port.type === req.query.type) : true;
    });
  }

  res.json({ ports: result });
}

// See https://expressjs.com/en/guide/routing.html for instructions on how to add new endpoints.
function createRoutes() {
  const router = express.Router();

  router.get("/ports", getPorts);

  return router;
}

module.exports = createRoutes;
