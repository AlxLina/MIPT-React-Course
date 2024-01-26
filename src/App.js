import React, {useState, useEffect} from 'react'
import {Card} from './components/card/Card.jsx';
import styles from './App.module.scss';
import {getArticles} from './components/get-articles.jsx';

function App() {
    const [data, setData] = useState(null);
    const [sorting, setSorting] = useState("date");

    useEffect(() => {
        getArticles().then(fetchedData => setData(fetchedData))
    }, [])

    const changeSortLikes = () =>{
      setSorting("currentLikes");
    }

    const changeSortDate = () =>{
      setSorting("date");
    }

    function sortMethod(sort){
      return (a, b) => (a[sort] > b[sort] ? -1 : 1)
    }

    return (
      <div>
      <div className={styles.header}>
        <div className={styles.dropdown}>
          <p>сортировать</p>
          <div className={styles.dropdown_content}>
            <button onClick={changeSortLikes}>по лайкам</button>{" "}
            <button onClick={changeSortDate}>по дате</button>
          </div>
        </div>
      </div>
      {data &&
        data
          .sort(sortMethod(sorting))
          .map((post) => <Card post={post} key={post.articleId}></Card>)}
    </div>
    );
}

export default App;
