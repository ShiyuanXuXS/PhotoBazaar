const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const tagRoutes = require('./src/routes/tag.routes');

app.use(express.json()); 

app.use('/api/tags', tagRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});