export const appwriteConfig = {
     endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
     projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID! ,
     databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
     userCollectionId:  process.env.NEXT_PUBLIC_APPWRITE_USERCID! ,
     filesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILESCID! ,
     bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET! ,
     secretKey: process.env.NEXT_APPWRITE_SECRET!

}