const {Router} = require("express")
const router = Router()
const productController = require('../controllers/productController')

router.get("/getProducts", productController.index)
router.get("/getOneProduct/:id", productController.getOne)
router.put("/updateProduct/:id", productController.update)
router.post("/createProducts/", productController.create)
router.delete("/deleteProduct/:id", productController.del)

module.exports = router