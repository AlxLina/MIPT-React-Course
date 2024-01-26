import {useState, useEffect} from 'react';
import { Comment } from "../comments/Comments";
import { getComments } from "../get_comments_by_article";
import styles from './Card.module.scss';


export function Card(props) {
        const { post } = props;
        const [comments, setComments] = useState([]);
        const [title, setTitle] = useState(post.title);
        const [text, setText] = useState(post.text);
        const [isChangeTitle, setIsChangeTitle] = useState(false);
        const [isChangeText, setIsChangeText] = useState(false);
        const [changeTitleStr, setIsChangeTitleStr] = useState("🖊️");
        const [changeTextStr, setIsChangeTextStr] = useState("🖊️");
        const [likes, setLikes] = useState(0);
        const [isLiked, setIsLiked] = useState(false);
        const [isShowComments, setIsShowComments] = useState(false);
        const [commentStr, setCommentStr] = useState("Показать комментарии");
        const [sorting, setSorting] = useState("date");


        useEffect(() => {
            setLikes(post.currentLikes);
          }, []);
        
          useEffect(() => {
            getComments(post.articleId).then((fetchedData) => {
              setComments(fetchedData);
            });
          }, []);

          const changeTitle = () => {
            if (isChangeTitle){
              setIsChangeTitle(false);
            } else {
              setIsChangeTitle(true);
            }
          }

          const changeText = () => {
            if (isChangeText){
              setIsChangeText(false);
            } else {
              setIsChangeText(true);
            }
          }

          const handleChangeTitle = (event) => {
            setTitle(event.target.value);
          };

          const handleChangeText = (event) => {
            setText(event.target.value);
          };

          const onSubmitTitle = (event) => {  
            post.title = title;
            setIsChangeTitle(false);
            setIsChangeTitleStr("🖊️");
            event.preventDefault();
          };

          const onSubmitText = (event) => {  
            post.text = text;
            setIsChangeText(false);
            setIsChangeTextStr("🖊️");
            event.preventDefault();
          };
        
          const changeLikes = () => {
            if (!isLiked) {
              setIsLiked(true);
              setLikes(likes + 1);
            }
            if (isLiked) {
              setIsLiked(false);
              setLikes(likes - 1);
            }
          };
          const showComments = () => {
            if (!isShowComments) {
              setIsShowComments(true);
              setCommentStr("Скрыть комментарии");
            } else {
              setIsShowComments(false);
              setCommentStr("Показать комментарии");
            }
          };

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
            <div className = {styles.card}>
              <div className={styles.edit}>
                {isChangeTitle ? (
                  <form>
                    <div className={styles.edit_box}>
                      <input
                        className={styles.edit_text}
                        value={title}
                        placeholder="Текст"
                        onChange={handleChangeTitle}
                        ></input>
                    </div>
                    <button className={styles.submit_title}type="submit" onClick={onSubmitTitle}>
                    👌🏻
                    </button>
                  </form>
                ) : (
                  <h2>{post.title}</h2>
                )}
                <button className={styles.edit_button} onClick={changeTitle}>{changeTitleStr}</button>
              </div>

              <div className={styles.edit}>
                {isChangeText ? (
                  <form>
                    <div className={styles.edit_box}>
                      <input
                        className={styles.edit_text}
                        value={text}
                        placeholder="Текст"
                        onChange={handleChangeText}
                        ></input>
                    </div>
                    <button className={styles.submit_title}type="submit" onClick={onSubmitText}>
                    👌🏻
                    </button>
                  </form>
                ) : (
                  <h3>{post.text}</h3>
                )}
                <button className={styles.edit_button} onClick={changeText}>{changeTextStr}</button>
              </div>

              <picture>
                <div className={styles.pic}>
                  <img src={post.image} width="500px" alt="postpic"></img>
                </div>
              </picture>
              <div className={styles.box_like}>
                <button className={isLiked ? (styles.like) : (styles.whiteLike)} onClick={changeLikes}></button>
                <div className={styles.likesCounter}>{likes}</div>
              </div>
              <div className={styles.boxComment}>
                <div className={styles.titleComment}>Комментарии : {post.commentsCount}</div>
                <button className={styles.checkComments} onClick={showComments}>
                  {commentStr}
                </button>
                </div>
                <div>
                  {isShowComments && comments && (
                      <div className={styles.dropdown}>
                        <p>сортировать</p>
                          <div className={styles.dropdown_content}>
                            <button onClick={changeSortLikes}>по лайкам</button>{" "}
                            <button onClick={changeSortDate}>по дате</button>
                          </div>
                      </div>
                  )}
                  {comments && isShowComments &&
                    comments.sort(sortMethod(sorting)).map((comment) => <Comment comment={comment}></Comment>)}
                </div>
                <div className={styles.date}>{post.date}</div>
            </div>
          );
        }