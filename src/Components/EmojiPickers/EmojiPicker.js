import {forwardRef, useEffect, useRef, useState} from "react";
import {data as emojiList} from './data';
import EmojiSearch from "./EmojiSearch";
import EmojiButtons from "./EmojiButtons";
import styles from "./emojiPicker.module.scss";

export function EmojiPicker(props,ref){
    const [isOpen,setIsOpen]=useState(false);
    const[emojis,setEmojis]=useState(emojiList);
    const containerRef=useRef(null);
    useEffect(()=>{
        window.addEventListener("click", e=>{
            if(!containerRef.current.contains(e.target)){
                setIsOpen(false);
                setEmojis(emojiList);
            }
        });
    });
    function onSearch(e){
        const q=e.target.value.toLowerCase();
        if(!!q){
            const search=emojiList.filter(emoji=>{
                return emoji.name.toLowerCase().includes(q) || emoji.keywords.toLowerCase().includes(q);
            });
            setEmojis(search);
        }else{
            setEmojis(emojiList);
        }
    }
    function handleOnClickEmoji(emoji){
        const cursorPos=ref.current.selectionStart;
        const text=ref.current.value;
        const prev=text.slice(0,cursorPos);
        const next=text.slice(cursorPos);
        ref.current.value=prev+emoji.symbol+next;
        ref.current.selectionStart=cursorPos+emoji.symbol.length;
        ref.current.selectionEnd=cursorPos+emoji.symbol.length;
        ref.current.focus();

    }
    return(<div ref={containerRef} className={styles.inputContainer}><button onClick={()=>setIsOpen(!isOpen)} className={styles.emojiPickerButton}>😀</button>
        {isOpen ? <div className={styles.emojiPickerContainer}>
            <EmojiSearch onSearch={onSearch}/>
            <div className={styles.emojisList}>
                {emojis.map(emoji=><EmojiButtons key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji}/>)}
            </div>
        </div>:''}
    </div>)
    }
    export default forwardRef(EmojiPicker);