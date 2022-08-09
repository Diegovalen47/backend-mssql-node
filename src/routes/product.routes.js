import { Router } from 'express'

import { createNewProduct, getProducts } from '../controllers/product.controller'

const router = Router()

router.get('/PRODUCT', getProducts)

router.post('/PRODUCT', createNewProduct)

router.delete('/PRODUCT', )

router.put('/PRODUCT', )

router.get('/PRODUCT', )

export default router