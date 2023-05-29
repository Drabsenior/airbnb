"use client";

import Image from "next/image";
interface AvatarProps {
  src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || "/images/placeholder.jpg"}
      alt="user"
      height="30"
      width="30"
      className="rounded-full"
    />
  );
};

export default Avatar;
