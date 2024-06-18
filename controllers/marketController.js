const Product = require("../models/Product");

const getAllPublishedProducts = async (req, res) => {  

  const products = await Product.find({ published: true });
  
  
  //pagination - sorting 
  const perPage = 5; //number of products per page
  const page = parseInt(req.query.page) || 1 ;

  
  const sortField = req.query.sortField || 'createdAt' ;
  const sortOrder = req.query.sortOrder;
  const sortOrderData = sortOrder === 'desc' ? -1:1 ;
  

  try{

      const totalProducts = await Product.countDocuments({ published: true });
      
      const totalPages = Math.ceil(totalProducts / perPage);
   
      const products = await Product.find({ published: true }).sort({[sortField] : sortOrderData}).skip((page-1) * perPage ).limit(perPage);
     
      res.render("market", { products, currentPage: page , totalPages,sortField,sortOrder });
      
  }
  catch(e){

      res.status(500).send(e.message);

  }

  //end of pagination - sorting

};








module.exports = {
  getAllPublishedProducts
};
