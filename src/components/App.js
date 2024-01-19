import { useEffect, useState } from 'react'
import Nav from './Nav'
import Article from './Article'
import ArticleEntry from './ArticleEntry'
import { SignIn, SignOut, useAuthentication } from '../services/authService'
import { fetchArticles, createArticle, deleteArticle } from '../services/articleService'
import shady from '../images/marshall.jpeg'
import './App.css'

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 5
  const user = useAuthentication()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      if (user) {
        const fetchArticlesData = async () => {
          setLoading(true)
          const fetchedArticles = await fetchArticles(currentPage, articlesPerPage)
          setArticles(fetchedArticles)
          setLoading(false)
        }
        fetchArticlesData()
      }
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'An error occurred')
    }
  }, [user, currentPage, articlesPerPage])

  const displayedArticles = articles.slice(0, 5)

  function addArticle({ title, body }) {
    createArticle({ title, body }).then(article => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
      fetchArticles(1, articlesPerPage).then(setArticles)
    })
  }

  return (
    <div className="App">
      {error && <p>Error: {error}</p>}
      <header>
        <div className="title">
          <h1>c44rson's hellscape</h1>
          <img className="shady" src={shady} alt="Eminem" />
          {user && <button onClick={() => setWriting(true)}>New Article</button>}
        </div>
        {!user ? <SignIn /> : <SignOut />}
      </header>
      <div className="nav">
        {!user ? (
          ''
        ) : loading ? (
          <span>...Firebase sucks...</span>
        ) : (
          <Nav articles={displayedArticles} setArticle={setArticle} />
        )}
        <div className="paginators">
          <button onClick={() => setCurrentPage(currentPage === 1 ? currentPage - 0 : currentPage - 1)}>
            Prev Page
          </button>
          <button onClick={() => setCurrentPage(currentPage > articles.length ? currentPage + 0 : currentPage + 1)}>
            Next Page
          </button>
        </div>
      </div>
      <div className="body">
        {user && article && !writing && (
          <button
            onClick={() =>
              deleteArticle(article.id).then(() => {
                fetchArticles(currentPage, articlesPerPage).then(setArticles)
                setArticle(null)
                setWriting(false)
              })
            }
          >
            Send to Shadow Realm
          </button>
        )}
        {!user ? '' : writing ? <ArticleEntry addArticle={addArticle} /> : <Article article={article} />}
      </div>
    </div>
  )
}
