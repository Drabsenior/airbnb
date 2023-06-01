"use client";

import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { useCallback } from "react";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, []);
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="os8lvzq6"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
        relative
        cursor-pointer
        hover:opacity-70
        transition
        border-dashed
        border-2
        p-20
        border-neutral-200
        flex
        flex-col
        justify-center
        items-center
        gap-4
        text-neutral-600
        "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>

            {value && (
              <div className="absolute inset-0 w-full h-full ">
                <Image
                  src={value}
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
