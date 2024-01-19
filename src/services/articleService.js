import { db } from '../firebaseConfig'
import { collection, query, getDocs, addDoc, orderBy, limit, deleteDoc, doc, startAfter } from 'firebase/firestore'

export async function createArticle({ title, body }) {
  const data = { title, body, date: Date.now() }
  const docRef = await addDoc(collection(db, 'articles'), data)
  return { id: docRef.id, ...data }
}

export async function deleteArticle(articleId) {
  await deleteDoc(doc(db, 'articles', articleId))
    .then(() => {
      console.log('Document successfully deleted!')
    })
    .catch(error => {
      console.error('Error removing document: ', error)
    })
}

export async function fetchArticles(pageNumber, pageSize) {
  const startAtDoc = pageNumber > 1 ? await getDocumentAt(pageNumber * pageSize - pageSize + 1) : null

  const articlesQuery = startAtDoc
    ? query(collection(db, 'articles'), orderBy('date', 'desc'), startAfter(startAtDoc), limit(pageSize))
    : query(collection(db, 'articles'), orderBy('date', 'desc'), limit(pageSize))

  const snapshot = await getDocs(articlesQuery)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

async function getDocumentAt(position) {
  const querySnapshot = await getDocs(query(collection(db, 'articles'), orderBy('date', 'desc'), limit(position)))
  return querySnapshot.docs[position - 1]
}
