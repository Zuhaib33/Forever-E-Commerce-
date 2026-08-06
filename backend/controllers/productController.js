

// add product
const addProduct = async (req,res)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestseller}= req.body;

        const image1 = req.files.image1
        const image2 = req.files.image2
        const image3 = req.files.image3
        const image4 = req.files.image4

        console.log(name,description,price,category,sizes,subCategory,bestseller,'sdfgh')
        console.log(image1,image2,image3,image4)

        res.json({})

    } catch(error){

         console.log(error)
         res.json({success:false,message:error.message})
    }

} 

// list product
const listProduct = async (req,res)=>{

    
}

// remove product
const removeProduct = async (req,res)=>{
    
}

// single product info
const singleProduct = async (req,res)=>{
    
}

export {addProduct,listProduct,singleProduct,removeProduct}