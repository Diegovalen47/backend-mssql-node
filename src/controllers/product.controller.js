import { getConnection, sql, queries } from '../database';

export const getProducts = async (req, res) => {

  try {

    const pool = await getConnection()
    const result = await pool.request().query(queries.getAllProducts);
  
    console.log(result.recordset)
  
    res.json(result.recordset)

  } catch (error) {
    
    res.status(500);
    res.send(error.message);

  }

};

export const createNewProduct = async (req, res) => {

  const { name, description } = req.body
  let { quantity } = req.body

  
  if (name == null || description == null) {
    return res.status(400).json({msg: 'Bad Request. Please fill all fields'})
  }
  
  if (quantity == null) quantity = 0;

  try {

    const pool = await getConnection()
  
    await pool
      .request()
      .input('name', sql.VarChar, name)
      .input('description', sql.Text, description)
      .input('quantity', sql.Int, quantity)
      .query(queries.addNewProduct)
      
    res.json({name, description, quantity})
  
  } catch (error) {
    
    res.status(500);
    res.send(error.message);

  }

}

export const getProductById = async (req, res) => {

  const {id} = req.params

  const pool = await getConnection()

  const result = await pool
    .request()
    .input('Id', id)
    .query(queries.getProductById)

  res.send(result.recordset[0])

}

export const deleteProductById = async (req, res) => {

  const {id} = req.params

  const pool = await getConnection()

  const result = await pool
    .request()
    .input('Id', id)
    .query(queries.deleteProduct)

  res.sendStatus(204)

}

export const getTotalProducts = async (req, res) => {

  const pool = await getConnection()

  const result = await pool
    .request()
    .query(queries.getTotalProducts)

  res.json(result.recordset[0][''])

}

export const updateProductById = async (req, res) => {

  const { name, description, quantity } = req.body
  const { id } = req.params

  if (name == null || description == null || quantity == null) {
    return res.status(400).json({msg: 'Bad Request. Please fill all fields'})
  }

  const pool = await getConnection()
  await pool
    .request()
    .input('name', sql.VarChar, name)
    .input('description', sql.Text, description)
    .input('quantity', sql.Int, quantity)
    .input('id', sql.Int, id)
    .query(queries.updateProductById)

  res.json({ name, description, quantity })


}