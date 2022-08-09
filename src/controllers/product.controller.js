import { getConnection } from '../database/connection';

export const getProducts = async (req, res) => {

  const pool = await getConnection()
  const result = await pool.request().query('SELECT * FROM PRODUCT');

  console.log(result.recordset)

  res.json(result.recordset)

};

export const createNewProduct = (req, res) => {
  res.json('new product')
}