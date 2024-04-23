import { convertImage } from "@/lib/helpers";
import { User } from "lucide-react";
import Image from "next/image";

export const ImageUpload = ({
  image,
  setFile,
  setImage,
  id,
  placeholder,
}: {
  image: string;
  setFile: any;
  setImage: (image: string) => void;
  id: string;
  placeholder: string;
}) => {
  const handleFileChange = async (file: any) => {
    try {
      setFile(file);
      const base64Image = await convertImage(file);
      setImage(base64Image);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <label
        htmlFor={id}
        className="cursor-pointer size-36 flex items-center justify-center rounded-full flex-col border-neutral-600 border bg-text"
      >
        {image ? (
          <Image
            src={image}
            alt="profile Image"
            width={500}
            height={250}
            className="size-full rounded-full object-cover"
          />
        ) : (
          <>
            <div className="flex items-center justify-center mb-2">
              <User className="size-7 text-bg" />
            </div>
            <p className="font-normal text-xs">{placeholder}</p>
          </>
        )}
      </label>

      <input
        type="file"
        id={id}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
    </>
  );
};
