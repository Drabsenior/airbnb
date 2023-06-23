import getFavouriteListings from "../actions/getFavouritesListings";
import getFavouriteListins from "../actions/getFavouritesListings";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";

const FavouritesPage = async () => {
  const listings = await getFavouriteListings();
  const currentUser = await getFavouriteListings();
  if (listings?.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitie="Looks like you have no favorite listings"
      />
    );
  }
  return <FavoriteClient listings={listings} currentUser={currentUser} />;
};

export default FavouritesPage;
