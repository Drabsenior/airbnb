import {Listing, Reservation, User} from '@prisma/client'


export type SafeListing = Omit<
    Listing,
    'createdAt' | 'roomCount' | 'bathroomCount' | 'guestCount'> & {
        createdAt:string,
        roomCount:string,
        bathroomCount:string,
        guestCount:string
    }

export type SafeReservation = Omit<
    Reservation,
    'createdAt' | 'startDate' | 'endDate' | 'listing' 
    > & {
        createdAt:string,
        startDate:string,
        endDate:string,
        listings:SafeListing
        
    }
export type SafeUser = Omit<
    User,
    'createdAt'|'updatedAt'|'emailVerified'
    > & {
        createdAt:string,
        updatedAt:string,
        emailVerified:string | null,
}