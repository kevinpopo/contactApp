const express 		= require('express');
const path 			= require('path');
const bodyParser 	= require('body-parser');
const UserRoute 	= require("./routes/userRoute");
const app 			= express();
const router 		= express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => console.log('The server started in port 3000'));

app.use(express.static(path.join(__dirname, '/../frontend/dist')))
app.get('/', (req, res) => res.sendFile('./index.html'));




router.use('/users', UserRoute);
app.use('/', router);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || err.statusCode || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;
