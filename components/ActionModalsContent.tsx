import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import { FormatDateTime } from "./FormatDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="file-details-thumbnail">
    <Thumbnail className="" type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="subtitle-2 mb-1">{file.name}</p>
      <FormatDateTime date={file.$createdAt} className="caption" />
    </div>
  </div>
);
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex w-full">
    <div className="w-3/5 flex-details-label text-left">{label}</div>
    <div className=" flex-details-value text-right">{value}</div>
  </div>
);
export const FileDetail = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.type} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};
interface ShareInputProps {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}
export const ShareInput = ({
  file,
  onInputChange,
  onRemove,
}: ShareInputProps) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 text-light-100 pl-1">
          Share files with other users
        </p>
        <Input
          type="email"
          placeholder="enter user email address"
          className="share-input-field"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} users
            </p>
          </div>
          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  className="share-remove-user"
                  onClick={() => onRemove(email)}
                >
                  <Image
                    className="remove-icon"
                    width={24}
                    height={24}
                    src="/assets/icons/remove.svg"
                    alt="remove"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
