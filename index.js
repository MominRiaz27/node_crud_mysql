//CRUD operation with Mysql

import express from "express"
import mysql from "mysql"
import bcrypt from 'bcrypt'
import moment from "moment";

import config  from "./app/config/db.config.js";
//import customerRoutes from "./controller/controller.js";

import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerDocument from "./swagger.json" assert { type: "json" };
import apiRoute from "./app/routes/apiRoute.js"

const app = express();

app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const db = mysql.createConnection(config)

app.use(express.json())

app.use('/api', apiRoute)



app.listen(8000,()=>{
    console.log(" Connected to database ")
})