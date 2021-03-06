const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
//this row for "body" parsing should be on top otherwise it doesn't work!!!
app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = config.port;

const start = async () => {
    try {
    await mongoose.connect(config.mongoUri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
};

start();

