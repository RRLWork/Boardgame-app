const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')

const {connect} = require('./src/utils/database');
const boardgamesRoutes = require('./src/api/routes/boardgames.routes');
const userRouter = require('./src/api/routes/users.routes');
const PORT = process.env.PORT || 3000;
dotenv.config();

const app = express();
connect();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/boardgames', boardgamesRoutes);

app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Listening on port: http://localhost:${PORT}`));