import styles from './emojiPicker.module.scss';
export default function EmojiButtons({emoji,onClick}){
    function handleClick(){
        onClick(emoji);
    }
    return<button onClick={handleClick} className={styles.emojiButton}>{emoji.symbol}</button>
}