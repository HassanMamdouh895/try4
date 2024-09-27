import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let Wishcontext = createContext();

export default function WishContextProvider({ children }) {

  let headers = { token: localStorage.getItem("userToken") };
  let [wishlist,setWishlist]= useState([])
  

  async function addProductWishlist(productId) {
    
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers}).then((response) => {
        console.log(response.data.message);
        setWishlist(response.data)
        toast.success(response.data.message);
        return response;
      }).catch((error) => {
        console.log(error);
        toast.error(response.data.message);
        return error;
      });
  }


  async function WishDisplay() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers}).then((response)=>{
        console.log(response)
        setWishlist(response.data)

        return response;
    }).catch((error)=>{
        console.log(error);
        return error
          
    })
}

async function WishDelete(productid) {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,{headers}).then((response)=>{
        console.log(response)
        toast.success(response.data.message);

        return response;
    }).catch((error)=>{
        console.log(error);
        toast.error(response.data.message);

        return error
          
    })
}

  return <Wishcontext.Provider value={{addProductWishlist,WishDisplay,WishDelete,wishlist,setWishlist}}>{children}</Wishcontext.Provider>
}
