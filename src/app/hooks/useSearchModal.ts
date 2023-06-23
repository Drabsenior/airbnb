import {create} from 'zustand'

interface searchModalStore {
    isOpen:boolean
    onOpen: ()=>void
    onClose:()=>void
}

const searchModal = create<searchModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))


export default searchModal