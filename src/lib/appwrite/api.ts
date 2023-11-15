import { INewUser } from '@/types'
import { account, appwriteConfig, avatars, databases } from './config'
import { ID } from 'appwrite'
export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    )
    if (!newAccount) throw new Error('Account creation failed')
    const avatarUrl = avatars.getInitials(user.name)
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    })

    return newUser
  } catch (error) {
    console.error(error)
    return error
  }
}

export const saveUserToDB = async (user: {
  accountId: string
  name: string
  email: string
  username?: string
  imageUrl: URL
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    )
    return newUser
  } catch (error) {
    console.error(error)
  }
}

export const signInAccount = async (user: {
  email: string
  password: string
}) => {
  try {
    const session = await account.createEmailSession(user.email, user.password)
    return session
  } catch (error) {
    console.error(error)
  }
}
