"use client";
import { Models } from "node-appwrite";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Button } from "./ui/button";
import { renameFile, updateFile, deleteFile } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
import { FileDetail, ShareInput } from "./ActionModalsContent";
export const ActionDropDown = ({ file }: { file: Models.Document }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [name, setName] = useState(file.name);
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [isDropDOwnOpen, setIsDropDownOpen] = useState(false);
  const path = usePathname();
  const closeAllModals = () => {
    setAction(null);
    setIsDropDownOpen(false);
    setIsModelOpen(false);
    setName(file.name);
  };
  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);
    const success = await updateFile({ fileId: file.$id, emails, path });
    if (success) setEmails(updatedEmails);
    closeAllModals();
  };
  const handleAction = async () => {
    if (!action) return null;
    setisLoading(true);
    let success = false;
    const actions = {
      rename: () =>
        renameFile({
          fileId: file.$id,
          name,
          extension: file.extension,
          path,
        }),
      share: () => updateFile({ fileId: file.$id, emails, path }),
      delete: () =>
        deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
    };
    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();
    setisLoading(false);
  };
  const renderDialogContent = () => {
    if (!action) return null;
    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-200">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetail file={file} />}
          {value === "share" && (
            <ShareInput
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
              file={file}
            />
          )}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure want to delete{``}
              <span className="delete-file-name">{file.name}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              className="capitalize modal-submit-button"
            >
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="Loader"
                  className="animate-spin"
                  height={24}
                  width={23}
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };
  return (
    <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
      <DropdownMenu open={isDropDOwnOpen} onOpenChange={setIsDropDownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            alt="dot"
            height={34}
            width={34}
            src="/assets/icons/dots.svg"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              onSelect={() => setIsDropDownOpen(false)}
              className="shadow-dropdown-item"
              key={actionItem.value}
              onClick={() => {
                setAction(actionItem);
                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                )
                  setIsModelOpen(true);
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.value}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.value}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

