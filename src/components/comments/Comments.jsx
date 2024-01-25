import {useState, useEffect} from 'react';
import style from "./Comments.module.scss";

export function Comment(props) {
    const { comment } = props;
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);


    useEffect(() => {
        setLikes(comment.currentLikes);
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

    return <div className={style.comment}>
        <div className={style.box_text}>
            <div className={style.author}>{comment.author}</div>
            <div className={style.text}>{comment.text}</div>
            <div className={style.date}>{comment.date}</div>
        </div>
        <div className={style.box_like}>
            <div className={style.likesCounter}>{likes}</div>
            <button className={isLiked ? (style.like) : (style.whiteLike)} onClick={changeLikes}></button>
        </div>
    </div>
}