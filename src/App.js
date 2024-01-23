import React, {useState, useEffect} from 'react'
import {Card} from './components/card/Card.jsx';
import './App.css';
import {getArticles} from './components/get-articles.jsx';

function App() {
  // Здесь приведен пример использования useEffect
// для реализации запроса после маунтинга по аналогии с componentDidMount
    const [data, setData] = useState(null)

    useEffect(() => {
        getArticles().then(fetchedData => setData(fetchedData))
    }, [])


    return (
      <>
        {data &&
          data.map((post) => <Card post={post} key={post.articleId}></Card>)}
      </>
    );
}

export default App;
