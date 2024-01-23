import styles from "./Comments.module.scss";

export function Comment(props) {
    const { comment } = props;

    return <div className={styles.comment}>
        <div className={styles.author}>{comment.author}</div>
        <div className={styles.text}>{comment.text}</div>
    </div>
}