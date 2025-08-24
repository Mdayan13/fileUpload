"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import React from "react";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOutUser } from "@/lib/actions/user.actions";
import {
  SheetDescription,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import FileUploader from "./FileUploader";
interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
}
const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  email,
  avatar,
}: Props) => {
  const pathName = usePathname();
  const [open, setopen] = useState(false);
  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        height="120"
        width="52"
        alt="logo"
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setopen}>
        <SheetTrigger>
          <Image
            src={"/assets/icons/menu.svg"}
            alt="menu"
            height={30}
            width={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen m-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                width={44}
                height={44}
                alt="avatar"
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathName === url && "shad-active",
                      pathName !== url && "hover:bg-rose-300"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      height={24}
                      width={24}
                      className={cn(
                        "nav-icon",
                        pathName === url && "nav-icon-active"
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-6 bg-light-400/35" />
          <div>
             <FileUploader className="" accountId={accountId} ownerId={ownerId} />
            <Button type="submit" onClick={async() => await signOutUser()}  className="mobile-sign-out-button">
              <Image
                height={24}
                src="/assets/icons/logout.svg"
                width={24}
                alt="logout"
                className="w-6"
              />
              <p>log-Out</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
