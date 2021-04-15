const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });