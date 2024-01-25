import {useState, useEffect} from 'react';
import { Comment } from "../comments/Comments";
import { getComments } from "../get_comments_by_article";
import styles from './Card.module.scss';


export function Card(props) {
        const { post } = props;
        const [comments, setComments] = useState([]);
        const [likes, setLikes] = useState(0);
        const [isLiked, setIsLiked] = useState(false);
        const [isShowComments, setIsShowComments] = useState(false);
        const [commentStr, setCommentStr] = useState("Показать комментарии");


        useEffect(() => {
            setLikes(post.currentLikes);
          }, []);
        
          useEffect(() => {
            getComments(post.articleId).then((fetchedData) => {
              setComments(fetchedData);
            });
          }, []);
        
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
        
          return (
            <div className = {styles.card}>
              <h2>{post.title}</h2>
              <h3>{post.text}</h3>
              <picture>
                <div className={styles.pic}>
                  <img src={post.image} width="500px"></img>
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
                  {comments && isShowComments &&
                    comments.map((comment) => <Comment comment={comment}></Comment>)}
                </div>
                <div className={styles.date}>{post.date}</div>
            </div>
          );
        }