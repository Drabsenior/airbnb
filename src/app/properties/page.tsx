import getCurrentUser from "../actions/getCurrentUser";
import getListing from "../actions/getListing";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitie="Please login" />;
  }
  const listings = await getListing({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties found"
        subtitie="looks like you have no  properties"
      />
    );
  }
  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
