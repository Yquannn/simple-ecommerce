const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const accountRoutes = require('./routes/accountRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors')

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api', productRoutes);
app.use('/api', accountRoutes);
app.use('/api', cartRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
