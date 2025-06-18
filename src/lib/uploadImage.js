import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { app } from './firebase'

export const uploadImage = async (file, userId) => {
  const storage = getStorage(app)
  const imageRef = ref(storage, `listings/${userId}/${uuidv4()}-${file.name}`)

  const snapshot = await uploadBytes(imageRef, file)
  const url = await getDownloadURL(snapshot.ref)

  return url
}
