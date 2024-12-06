const pool = require('../config/dbConfig.js');

exports.fetchAll = async () => {
  const [products] = await pool.query('SELECT * FROM products');
  return products;
};

exports.create = async (name, description, price, imageUrl) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)',
    [name, description, parseFloat(price), imageUrl]
  );

  return { id: result.insertId, name, description, price, imageUrl };
};


