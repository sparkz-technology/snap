import { Client, Account, Storage, Databases, Avatars } from 'appwrite'

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT as string,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID as string,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID as string,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID as string,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID as string,
  savesCollectionId: import.meta.env
    .VITE_APPWRITE_SAVES_COLLECTION_ID as string,
}

export const client = new Client()

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)
export const account = new Account(client)
export const storage = new Storage(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)
