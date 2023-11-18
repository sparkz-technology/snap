import { INewUser } from '@/types'
import { account, appwriteConfig, avatars, databases } from './config'
import { ID, Query } from 'appwrite'
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

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw new Error('No account found')
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )
    if (!currentUser) throw new Error('No user found')
    return currentUser.documents[0]
  } catch (error) {
    console.error(error)
  }
}

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (error) {
    console.error(error)
  }
}
