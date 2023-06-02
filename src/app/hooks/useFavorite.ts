import axios from "axios";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import userLoginModal from "./userLoginModal";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


interface IUseFavorite{
    listingId:string,
    currentUser:SafeUser | null | undefined
}

const useFavorite = ({listingId,currentUser}:IUseFavorite)=>{
   
    const router = useRouter()
    const loginModal = userLoginModal()

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    },[loginModal,listingId])

    const toggleFavorite = useCallback(async(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation()

        if(!currentUser){
            return loginModal.onOpen()
        }
        try {
            let request
            if(hasFavorited){
                request =()=> axios.delete(`/api/favorites/${listingId}`)
            }else{
                request =()=> axios.post(`/api/favorites/${listingId}`)
            }
            
            await request()
            router.refresh()
            toast.success('Success')

        } catch (error) {
            toast.error('something went wrong')
        }

    },[currentUser,listingId,hasFavorited,loginModal,router])

    return {
        hasFavorited,
        toggleFavorite
    }
}


export default useFavorite
