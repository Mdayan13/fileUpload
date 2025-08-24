"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { avatarPlaceHolderUrl, navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
interface Props{
  fullName: string;
  avatar: string;
  email: string;
}
const Sidebar = ({fullName, avatar, email}:Props) => {
  const pathName = usePathname();
  return (
    <aside className="sidebar">
      <Link href={"/"}>
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          height={50}
          width={150}
          className="hidden lg:block h-auto"
        />
        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          height={52}
          width={52}
          className="lg:hidden"
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-5"> 
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathName === url && "shad-active", pathName !== url && "hover:bg-rose-300"
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
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src="/assets/images/files-2.png"
        height={400}
        width={500}
        className="w-full mt-2 hover:scale-100 hover:rotate-3"
        alt="files"
      />
      <div className="sidebar-user-info">
        <Image
          src={avatarPlaceHolderUrl}
          height={44}
          width={44}
          alt="Avatar"
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
