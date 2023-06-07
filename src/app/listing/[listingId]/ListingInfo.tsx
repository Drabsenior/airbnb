"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: string;
  roomCount: string;
  bathroomCount: string;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div
      className="
        col-span-4 flex flex-col gap-8
    "
    ></div>
  );
};

export default ListingInfo;
