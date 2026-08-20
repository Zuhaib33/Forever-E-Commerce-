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

    const addtoCard = (itemID, size) => {
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


    const updateQuantity = async (itemID, size, quantity) => {
        let cartData = structuredClone(itemCard)
        cartData[itemID][size] = quantity;
        setItemcard(cartData)
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
            console.log("backendUrl =", backendUrl)
            
            if (response.data.success) {
                setProduct(response.data.product)
               
            } else {
                toast.error(response.data.message)
            }


        } catch (error) {

            toast.error(error.message)

        }
    }

    useEffect(() => {
        getProductData()
    }, [])

     useEffect(()=>{
        if(!token && localStorage.getItem('token') ){
            setToken(localStorage.getItem('token'))
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