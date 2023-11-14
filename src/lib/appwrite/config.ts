import { Client, Account, Storage, Databases, Avatars } from 'appwrite'

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT as string,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
}

export const client = new Client()

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)
export const account = new Account(client)
export const storage = new Storage(client)
export const database = new Databases(client)
export const avatar = new Avatars(client)
