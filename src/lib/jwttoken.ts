const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET; // same one used in Railway service

const anon = jwt.sign({ role: 'anon' }, secret, {
  algorithm: 'HS256',
  expiresIn: '10y',
});

const service = jwt.sign({ role: 'service_role' }, secret, {
  algorithm: 'HS256',
  expiresIn: '10y',
});

console.log('Anon key:\n', anon);
console.log('\nService role key:\n', service);
