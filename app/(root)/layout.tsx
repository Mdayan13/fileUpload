
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
export const dynamic = "force-dynamic";

const layout = async({ children }: { children: ReactNode }) => {
  const currentUser = await getCurrentUser();
  if(!currentUser)return  redirect("/sign-in");
  return (
    <main className="flex h-screen">
      <Sidebar  {... currentUser}/>
      <section className="flex h-full flex-col flex-1">
        <MobileNavigation {... currentUser} /> <Header userId={currentUser.$id} accountId={currentUser.accountId} /> <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default layout;
