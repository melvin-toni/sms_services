const env = require('dotenv');
const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

if (process.env.NODE_ENV === 'production') {
    console.log("production");
    env.config({ path: '.env.production' });
} else {
    console.log("development");
    env.config({ path: '.env.development' });  
}

app.set('host', process.env.HOST);
app.set('port', process.env.PORT);
app.use(express.json());
// app.use(bodyParser.json({limit: '5mb', type: 'application/json'}));
// app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method == "OPTIONS") {
        res.writeHead(200);
        res.end();
    } else {
        next();
    }
});

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('MongoDB connection Established');
}).catch((error) => {
    console.log('MongoDB connection error ' + error.message);
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', function (req, res, next) {
    res.status(200).send('Authorization required');
})

const scheduleRoutes = require('./routes/schedule');

app.use('/api/schedule', scheduleRoutes);

app.listen(app.get('port'), () => console.log(`App is running on http://${app.get('host')}:${app.get('port')}`));