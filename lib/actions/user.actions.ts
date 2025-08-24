"use server";
import {  ID, Query, Permission, Role, Account } from "node-appwrite";

import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import {avatarPlaceHolderUrl} from "../../constants/index"
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { string } from "zod";
import { error } from "console";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("email", [email])]
  );
  return result.total > 0 ? result.documents[0] : null;
};
const handleError = ({
  error,
  message,
}: {
  error: unknown;
  message: unknown;
}) => {
  console.log(error, message);
};

export const sendEmailOtp = async({ email }: { email: string }) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError({ error, message: "server error while sending OTP for email" });
  }
};
export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOtp({ email });

  if (!accountId) throw new Error("there is no AccountId");
  if (!existingUser) {
    const { databases } = await createAdminClient();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar:
          avatarPlaceHolderUrl,
        accountId,
      },
      [
        Permission.read(Role.user(accountId)),
        Permission.update(Role.user(accountId)),
        Permission.delete(Role.user(accountId)),
      ]
    );
  }
  return parseStringify({ accountId });
};

export const verifySecret = async({accountId, password}: {accountId: string, password:string}) => {

     try {
          const {account} = await createAdminClient();
          const session = await account.createSession(accountId, password);
          // For localhost, avoid "secure: true" which blocks non-HTTPS cookies.
          const isLocalhost = process.env.NEXT_PUBLIC_APP_URL?.startsWith("http://localhost")
            || process.env.NEXT_PUBLIC_APP_URL?.startsWith("http://127.0.0.1")
            || process.env.NODE_ENV !== "production";
          (await cookies()).set("appwrite-session", session.secret, {
               path: "/",
               httpOnly: true,
               sameSite: "lax",
               secure: isLocalhost ? false : true,
          })
          return parseStringify({sessionId: session.$id})
     } catch (error) {
     handleError({error,message: "Failed toVerify Otp"});
     }
}
export const getCurrentUser = async() => {
  try {
  const { account } = await createSessionClient();
  const { databases } = await createAdminClient();
  const result = await account.get();
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", [result.$id])]
    );
    if (user.total === 0) return null;
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
}
export const signOutUser = async() => {
  const {account } =  await createSessionClient();
  try {
   await account.deleteSession("current");
   (await cookies()).delete("appwrite-session");

  } catch (error) {
    console.log("server error:- failed to logout User",error)
  }finally{
  redirect("/sign-in")
  }
}

export const signInUser = async({email}:{email:string}) =>{

  try {
    const existingUser = await getUserByEmail(email);
    if(!existingUser) return parseStringify({accountId: null, error: "User Not foumd"});
    await sendEmailOtp({email});
    return parseStringify({accountId: existingUser.accountId})
  } catch (error) {
    handleError({error, message:"failed to Filnd User"});
  }
}