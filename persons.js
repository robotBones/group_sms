'use strict';

const loki = require('lokijs');

const db = new loki('coven.json');
const persons = db.addCollection('persons');

module.exports = persons;
