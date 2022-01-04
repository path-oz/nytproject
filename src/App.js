
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Books() {
  const [books, setBoooks] = useState([])


  useEffect(() => {
      const fetchBooks = async () => {
          const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=
              ${process.env.REACT_APP_API_KEY}`
          )
          setBoooks(res.data.results.books)
          console.log(res.data);
      }

      fetchBooks()

  }, [])

  return (
      <>
          <header>
              <div>
                  <h1>New York Times Bestseller List</h1>
              </div>
          </header>
       
          <div className="book-container" >
              {books.map((book) => {
                  const {author,book_image,description,primary_isbn10,primary_isbn13,
                  rank,rank_last_week,title,
                  weeks_on_list} = book

                  var alltogether = "https://www.amazon.com/dp/" + primary_isbn10 + "?tag=o3books-20"


                  return (
                      <div className="book"  key={rank}>
                          <img src={book_image}alt={title}/>
                         
                          <div className="book-info">
                              <h3>
                                 {title}
                                 
                              </h3>
                          </div>
                          
                          <div className="book-overview">
                              
                              <h2>Overview</h2>

                              <p>{description}</p>
                              <p><span className="book-details">Author:</span> {author}</p>
                              <p><span className="book-details">Rank:</span> {rank}</p>
                              <p><span className="book-details">Rank Last Week:</span> {rank_last_week}</p>
                              <p><span className="book-details">Weeks On Bestseller List:</span> {weeks_on_list}</p>
                              <p><span className="book-details">ISBN:</span> {primary_isbn10}</p>
                              <a href={alltogether} class="button-buy">Click to buy now!</a>
                              
                              
                              
                              

                          </div>
                      </div>
                      
                  )
              })}
              
          </div>
          <footer>
              by O3 Books
          </footer>
      </>
      
  )
  
}
function App() {
  return (
    <div>
    <Books/>
  </div>
  
);
}
export default App;
