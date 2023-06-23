import prisma from "../libs/Prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });
    const safeFavourites = favourites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));
    return safeFavourites;
  } catch (error) {
    throw new Error("somthing went wrong");
  }
}
