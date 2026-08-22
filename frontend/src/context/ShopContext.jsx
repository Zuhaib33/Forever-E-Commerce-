import { createContext, useEffect, useState } from "react";
// import {products} from "../assets/assets";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'toastify'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = "http://localhost:3000"
    
    const [showBar, setShowBar] = useState(false)
    const [search, setSearch] = useState("");
    const [itemCard, setItemcard] = useState({})
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const [products, setProduct] = useState([])

    const [token ,setToken]= useState("")



    const addtoCard = async (itemID, size) => {
        const cardData = structuredClone(itemCard)
        if (cardData[itemID]) {
            if (cardData[itemID][size]) {
                cardData[itemID][size] += 1;
            }
            else {
                cardData[itemID][size] = 1;
            }
        }
        else {
            cardData[itemID] = {}
            cardData[itemID][size] = 1;
        }
        setItemcard(cardData)

        if(token){

            try {

                await axios.post(backendUrl + "/api/cart/add", {itemID, size} ,{headers:{token}})
                
            } catch (error) {
                
                console.log(error)
                toast.error(error.message)
            }

        }
    }


    const totalCount = () => {
        let initCount = 0;
        for (const items in itemCard) {
            for (const item in itemCard[items]) {
                initCount += itemCard[items][item]
                setCount(initCount)
            }
        }
    }

    useEffect(() => {
       
        totalCount();
    }, [itemCard])




    const updateQuantity = async (itemID, size, quantity,token) => {
        let cartData = structuredClone(itemCard)
        cartData[itemID][size] = quantity;
        setItemcard(cartData)

        if(token){

            try {
                
                await axios.post(backendUrl+'/api/cart/update', {itemID,size,quantity} ,{headers:{token}})
            } catch (error) {

                console.log(error)
                toast.error(error.message)
                
            }
        }
    }

   



    const getCardAmount = () => {
        let totalAmount = 0;
        for (const items in itemCard) {
            let itemInfo = products.find((product) => product._id == items);
            for (const item in itemCard[items]) {
                if (itemCard[items][item] > 0) {
                    totalAmount += itemInfo.price * itemCard[items][item]
                }
            }
        }
        return totalAmount
    }

    // {---------connect with backend ------------}

    const getProductData = async () => {
        try {

            const response = await axios.get(backendUrl + "/api/product/list")
            
            
            if (response.data.success) {
                setProduct(response.data.product)
               
            } else {
                console.log(response.data.message)
            }


        } catch (error) {

            toast.error(error.message)

        }
    }
    //  getting cart data from data base
     const getUserCart = async (token)=>{

        try {
            
            const responce = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token:token}})
              
            if(responce.data.success){

                setItemcard(responce.data.cartData)
               
            }else{
                toast.error(responce.data.message)
            }
        } catch (error) {

            console.log(error)
             toast.error(error.message)
            
        }
     }

    useEffect(() => {
        getProductData()
    }, [])

     useEffect(()=>{
        if(!token && localStorage.getItem('token') ){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
            
        }
     },[])

    const value = {
        products,
        currency,
        delivery_fee,
        showBar,
        search,
        setShowBar,
        setSearch,
        itemCard,
        setItemcard,
        addtoCard,
        count,
        updateQuantity,
        getCardAmount,
        navigate,
        backendUrl,
        setToken,
        token


    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;