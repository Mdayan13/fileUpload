import React from "react";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import {Toaster} from "@/components/ui/sonner";
import Search from "./Search";
const Header = ({userId, accountId}: {userId:string, accountId:string}) => {
  return (
    <header className="header">
      <Search />
      <Toaster />

      <div className="header-wrapper">
        <FileUploader accountId={accountId} ownerId={userId} />
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              height={24}
              src="/assets/icons/logout.svg"
              width={24}
              alt="logout"
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
