import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function ArticleEntry({ addArticle }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('<p></p>')
  const [error, setError] = useState(null)

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError('You need a title!')
    } else {
      addArticle({ title, body })
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        <h1>Title</h1>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <h1>Body</h1>
        <ReactQuill value={body} onChange={value => setBody(value)} />
        <p>spew your nonsense:</p>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
