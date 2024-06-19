const Product = require("../models/Product");

const getAllProducts = async (req, res) => {  

        const products = await Product.find({ createdBy: req.user._id }).sort("createdAt");
        
        
        //pagination - sorting 
        const perPage = 5; //number of products per page
        const page = parseInt(req.query.page) || 1 ;

        
        const sortField = req.query.sortField || 'createdAt' ;
        const sortOrder = req.query.sortOrder;
        const sortOrderData = sortOrder === 'desc' ? -1:1 ;
        

        try{

            const totalProducts = await Product.countDocuments({createdBy: req.user._id });
            
            const totalPages = Math.ceil(totalProducts / perPage);
         
            const products = await Product.find({ createdBy: req.user._id }).sort({[sortField] : sortOrderData}).skip((page-1) * perPage ).limit(perPage);
           
            res.render("products", { products, currentPage: page , totalPages,sortField,sortOrder });
            
        }
        catch(e){

            res.status(500).send(e.message);

        }

        //end of pagination - sorting

};






const newProduct = async (req, res) => {
  res.render("product", { product: null });
}


// to add new product 

const createProduct = async (req, res) => { 

          req.body.createdBy = req.user._id.toString()
         
           req.body.createdByName =req.user.name;

          const { name, price, description } = req.body;

          if (name === '' || price === '' || description === '' ) {

                    req.flash('error', 'All required fields cannot be empty.');
                    res.redirect('/products/new');
          }

         

          req.body.published = req.body.published? true:false;

          const product = await Product.create({ ...req.body });

          res.redirect("/products");
};


// to edit Product 

const editProduct = async (req, res) => {

          const productId = req.params.id;
          const userId = req.user._id.toString();
          
          const product = await Product.findOne({
            _id: productId,
            createdBy: userId,
          });
          if (!product) {
            req.flash("error", `No product with id: ${productId}`);
            res.redirect("/products");
          }
          res.render("product", { product });
}


const updateProduct = async (req, res) => {

            const userId = req.user._id.toString();
            const productId = req.params.id;
            const { name, price, description } = req.body;

            if (name === '' || price === '' || description === '' ) {

                        req.flash('error', 'All required fields cannot be empty.');
                        res.redirect('/products');
            }

            req.body.published = req.body.published? true:false;
            req.body.createdByName = req.user.name;

           
            const product = await Product.findOneAndUpdate(
                        { _id: productId, createdBy: userId },
                        req.body,
                        { new: true, runValidators: true }
            );


            if (!product) {

                        req.flash("error", `No product with id: ${productId}`);
                        res.redirect("/products");
            }
            res.redirect("/products");
};



const deleteProduct = async (req, res) => {

            const userId = req.user._id.toString();

            const productId = req.params.id;

            const product = await Product.findOneAndDelete({
                        _id: productId,
                        createdBy: userId,
            });

            if (!product) {
              req.flash("error", `No product with id: ${productId}`);
            }

            res.redirect("/products");
};



module.exports = {
            getAllProducts,
            createProduct,
            updateProduct,
            deleteProduct,
            newProduct,
            editProduct
};
