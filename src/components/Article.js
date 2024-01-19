export default function Article({ article }) {
  return (
    <article>
      {!article ? (
        <p>Please don't read any more of my dumb articles</p>
      ) : (
        <section>
          <h1>{article.title}</h1>
          <p className="date">{`Posted: ${new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).format(article.date)}`}</p>
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </section>
      )}
    </article>
  )
}
