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

  const { name } = req.body
  let { price } = req.body

  if (name == null) {
    return res.status(400).json({msg: 'Bad Request. Please fill all fields'})
  }
  
  if (price == null) price = 0;

  try {

    const pool = await getConnection()
  
    await pool
      .request()
      .input('name', sql.VarChar, name)
      .input('price', sql.Real, price)
      .query(queries.addNewProduct)
      
    res.json({name, price})
  
  } catch (error) {
    
    res.status(500);
    res.send(error.message);

  }

}

export const getProductById = async (req, res) => {

  try {

    const {id} = req.params

    const pool = await getConnection()
  
    const result = await pool
      .request()
      .input('Id', id)
      .query(queries.getProductById)
  
    res.send(result.recordset[0])

  } catch (error) {
    
    res.status(500);
    res.send(error.message);

  }

}

export const deleteProductById = async (req, res) => {

  try {

    const {id} = req.params

    const pool = await getConnection()
  
    const result = await pool
      .request()
      .input('Id', id)
      .query(queries.deleteProduct)
  
    res.sendStatus(204)

  } catch (error) {
    
    res.status(500);
    res.send(error.message);

  }

}

export const getTotalProducts = async (req, res) => {

  try {

    const pool = await getConnection()

    const result = await pool
      .request()
      .query(queries.getTotalProducts)
  
    res.json(result.recordset[0][''])

  } catch (error) {
    
    res.status(500);
    res.send(error.message);

  }

}

export const updateProductById = async (req, res) => {

  const { name, price } = req.body
  const { id } = req.params

  if (name == null || price == null) {
    return res.status(400).json({msg: 'Bad Request. Please fill all fields'})
  }

  try {

    const pool = await getConnection()
    await pool
      .request()
      .input('name', sql.VarChar, name)
      .input('price', sql.Real, price)
      .input('id', sql.Int, id)
      .query(queries.updateProductById)
  
    res.json({ name, price })

  } catch (error) {
    
    res.status(500);
    res.send(error.message);

  }

}