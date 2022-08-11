import express from 'express';
import config from './config';
import productRoutes from './routes/product.routes'

const app = express();

app.set('port', config.port)

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(productRoutes)

export default app;
