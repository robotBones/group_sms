'use strict';

const db = new loki('coven.json');
const persons = db.addCollection('persons');

export persons;
