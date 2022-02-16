const express = require('express');
const router =  express.Router();
const path = require('path');

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductContoller = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/' );
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});
 
const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


//Handle requests to /products
router.get('/', ProductContoller.products_get_all );

router.post('/', checkAuth, upload.single('productImage'), ProductContoller.products_create_product);

router.get('/:productId', ProductContoller.products_get_product);

router.patch('/:productId', checkAuth, ProductContoller.products_update_product);

router.delete('/:productId', checkAuth, ProductContoller.products_delete);


module.exports = router;        