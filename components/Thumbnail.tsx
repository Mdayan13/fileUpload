import { getFileIcon } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
interface Props {
  type: string;
  extension: string;
  url: string;
  className: string;
  imageClassName: string;
}

export const Thumbnail = ({
  type,
  extension,
  url,
  className,
  imageClassName,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";
  return (
    <figure className={cn("thumbnail size-14 rounded-full")}>
      <Image
        alt="thumbnail"
        src={isImage ? url : getFileIcon(extension, type)}
        height={150}
        width={150}
        className={cn(
          "size-14 object-cover",
          imageClassName,
          isImage && "thubmnail-image"
        )}
      />
    </figure>
  );
};

export default Thumbnail;
