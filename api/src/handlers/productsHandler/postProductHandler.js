const {postProductController} = require("../../controllers/productsController/postProductController");

const postProductHandler = async (req,res)=>{
    try{
        const{name,price,stock,ingredients,image,score,types,categories} = req.body;

        const newProduct = await postProductController (name,price,stock,ingredients,image,score,types,categories);
        res.status(200).json(newProduct);
    }
    catch(error){
        res.status(400).json({error:error.message});
    };
};
module.exports = {postProductHandler};