import { getConnection, sql } from '../database/connection';

export const getProducts = async (req, res) => {

  const pool = await getConnection()
  const result = await pool.request().query('SELECT * FROM PRODUCT');

  console.log(result.recordset)

  res.json(result.recordset)

};

export const createNewProduct = async (req, res) => {

  const { name, description } = req.body
  let { quantity } = req.body

  
  if (name == null || description == null) {
    return res.status(400).json({msg: 'Bad Request. Please fill all fields'})
  }
  
  if (quantity == null) quantity = 0;

  const pool = await getConnection()
  
  await pool.request()
    .input('name', sql.VarChar, name)
    .input('description', sql.Text, description)
    .input('quantity', sql.Int, quantity)
    .query(`  
      INSERT INTO PRODUCT (name, description, quantity) 
      VALUES (@name, @description, @quantity)
    `)
    
  res.json("new product")

}