require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./app/models');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("app/public"));

//Set app config
const title = process.env.TITLE;
const port = process.env.PORT;
const baseUrl = process.env.URL + port;

// Middleware untuk menangani CORS (Cross-Origin Resource Sharing)
// Memperbolehkan akses dari semua origin dengan setelan "*" pada header Access-Control-Allow-Origin
// Menetapkan header yang diizinkan untuk digunakan dalam permintaan (Allow-Headers)
// Jika metode permintaan adalah OPTIONS, menetapkan metode yang diizinkan (Allow-Methods)
// Mengizinkan akses untuk metode PUT, POST, PATCH, DELETE, GET
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Memperbolehkan akses dari semua origin
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
    ); // Menetapkan header yang diizinkan dalam permintaan
    if (req.method === 'OPTIONS') { // Menangani permintaan metode OPTIONS
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // Menetapkan metode yang diizinkan
        return res.status(200).json({}); // Mengembalikan status 200 jika metode OPTIONS
    }
    next(); // Melanjutkan ke middleware berikutnya
});

// Menggunakan router yang didefinisikan dalam file router.js
require('./app/router/router.js')(app);

// Sinkronisasi model-model Sequelize dengan basis data
db.sequelize.sync().then(() => {
    // create_roles(); // Jika diperlukan, panggil fungsi untuk membuat peran (roles)
    app.listen(port, () => console.log(title + " run on " + baseUrl)); // Menjalankan server pada port yang ditentukan
});
