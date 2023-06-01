import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '../../libs/Prismadb'

export async function POST (request:Request){
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return NextResponse.error()

    }
    console.log(currentUser)
    const body = await request.json()
      console.log('body is here')
    const {
        title,
        description,
        imageSrc,
        category,
        price,
        location,
        roomCount,
        bathroomCount,
        guestCount
    } = body

    Object.keys(body).forEach((value:any)=>{
        if(!body[value]){
            return NextResponse.error()

        }
    })
    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount:roomCount.toString(),
            bathroomCount:bathroomCount.toString(),
            guestCount:guestCount.toString(),
            locationValue:location.value,
            price:parseInt(price,10),
            userId:currentUser.id
            
        }
    })
    return NextResponse.json(listing)
}
