const app = require('./app');
let port = process.env.PORT || 5000;
app.listen(port)
console.log(`API server is running on port ${port}`)