"use client";
import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { error } from "console";
import ListingCard from "../components/listing/ListingCard";

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}
const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeleteingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation deleted");
          router.refresh();
        })
        .catch((error) => {
          throw new Error("Somthing went wrong");
        })
        .finally(() => {
          setDeleteingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="No Reservations" subtitle="Bookings in your properties" />
      <div
        className="
       mt-10
       grid
       grid-cols-1
       sm:grid-cols-2
       md:grid-cols-3
       lg:grid-cols-4
       xl:grid-cols-5
       2xl:grid-cols-6
       gap-8
      "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listings}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
