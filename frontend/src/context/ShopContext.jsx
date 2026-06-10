import { createContext, useEffect, useState } from "react";
import {products} from "../assets/assets";

export const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const currency="$";
    const delivery_fee=10;
    const [showBar,setShowBar]=useState(false)
    const [search, setSearch] = useState("");
    const [itemCard,setItemcard]= useState({})
    const [count, setCount]=useState(0)

    const addtoCard=(itemID,size)=>{
        const cardData= structuredClone(itemCard)
        if(cardData[itemID]){
            if(cardData[itemID][size]){
                cardData[itemID][size]+=1; 
            }
            else{
                cardData[itemID][size]=1;
            }
        }
        else{
            cardData[itemID]={}
            cardData[itemID][size]=1;
        }
        setItemcard(cardData)
    }
      const totalCount=()=>{
        let initCount=0;
        for(const items in itemCard){
            for(const item in itemCard[items]){
                initCount+=itemCard[items][item]
                setCount(initCount)
            }
        }
      }

    useEffect(()=>{
        console.log(itemCard,count)
        totalCount();
    },[itemCard])
    
     
    const updateQuantity =async (itemID,size,quantity)=>{
        let cartData=structuredClone(itemCard)
        cartData[itemID][size]=quantity;
        setItemcard(cartData)
    }

        const value ={
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
    updateQuantity
    

    }
    return(
        <ShopContext.Provider  value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;