const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const tagRoutes = require('./src/routes/tag.routes'); // 导入路由

app.use(express.json()); // 使用 JSON 解析中间件

app.use('/api/tags', tagRoutes); // 配置标签路由

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});