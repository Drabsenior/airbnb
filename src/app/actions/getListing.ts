import prisma from '../../app/libs/Prismadb'

export interface IListingParams{
    userId?:string,
    guestCount?:number,
    roomCount?:number,
    bathroomCount?:number,
    starDate?:string,
    endDate?:string,
    locationValue?:string,
    category?:string
}

export default async function getListing(params:IListingParams){
    try {
        const {userId,guestCount,roomCount,bathroomCount,starDate,endDate,locationValue,category} = params

        let query:any = {}

        if(userId){
            query.userId= userId
        }

        if(category){
            query.category= category
        }
        if(roomCount){
            query.roomCount= {
                gte: +roomCount
            }
        }
        if(guestCount){
            query.guestCount= {
                gte: +guestCount
            }
        }
        if(bathroomCount){
            query.bathroomCount= {
                gte: +bathroomCount
            }   
        }   

        if(locationValue){
            query.locationValue = locationValue
        }

        if(starDate && endDate){
            query.NOT = {
                reservations:{
                    some:{
                        OR:[
                            {
                             endDate: { gte:starDate},
                             starDate:{lte:starDate}
                            },
                            {
                                starDate:{lte:endDate},
                                endDate:{gte:endDate}
                            }

                        ]
                    }
                }
            }
        }
        const listings = await prisma.listing.findMany({
            where:query,
            orderBy:{
                createdAt:'desc'
            }
        })
        const safeListings = listings.map((listing)=>({
            ...listing,
            createdAt:listing.createdAt.toISOString()
        }))
        return safeListings
    } catch (error:any) {
        throw new Error(error)
    }
}