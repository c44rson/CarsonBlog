# c44rson's hellscape (Firebase-backed Web App) #
## [Firebase Live Hosting](https://barebonesblog-c44rson.web.app/) ##

## Credit ##
* [CSS button styling](https://getcssscan.com/css-buttons-examples)
* [Firebase documentation](https://firebase.google.com/docs/firestore)
* [React-Quill documentation](https://quilljs.com/docs/quickstart/)

## Major Added Components ##
* Article Deletion
  * Added deleteArticle function in articleService.js that pulls the id from the article argument in article.js.
  * Once deletion happens articles are fetched and the old article is deselected.
* Pagination
  * Ordered in descending order.
  * 5 articles per page.
  * Doesn't page forward past 1 empty tab.
  * Doesn't page backward before 0.
* Rich Text Editing
  * Applied for the body of the articles.
  * Used react-quill.
* Timespace Conversion
  * Used Intl.DateTimeFormat function to convert milliseconds since 1970 (actually insanity).
 
## All or Nothing Requirements ##
* Background image or gradient
  * Shown in body and nav.
* Non-standard font
  * Oswald and Comic Neue.
* Grid layout
  * Used for the overall app itself.
* Flex layout
  * Implemented nested in the header, nav.
* Title
  * h1 in header
* Fun image(s)
  * Eminem
* Transition
  * Buttons and underlined nav titles

## Feedback and Error Handling ##
* try-catch in useEffect() in App.js
* setLoading() in useEffect() in App.js
  * Happens when an article is deleted or a page is turned and the nav needs to refresh
  * Also lets the user know about a possible Firebase issue
