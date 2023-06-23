import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";

const ReservatoinPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitie="Please login" />;
  }
  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations found"
        subtitie="looks like you have no reservation on your properties"
      />
    );
  }
  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservatoinPage;
