import {create} from 'zustand'

interface userLoginModalStore {
    isOpen:boolean
    onOpen: ()=>void
    onClose:()=>void
}

const userLoginModal = create<userLoginModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))


export default userLoginModal