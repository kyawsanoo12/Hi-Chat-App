import React from 'react';
import Picker from "emoji-picker-react";
import { useDispatch } from 'react-redux';
import { addEmojiInMessage } from '../../../../action';

const EmojiButton = ({ message, setShowEmoji ,socket}) => {
  const dispatch = useDispatch();
  const handleEmojiClick = (e, emojiObject) => {
  
      dispatch(addEmojiInMessage({ messageId: message._id, emoji: emojiObject.emoji },socket));
      
        setShowEmoji(false)
    }
  return (
      <div >
          <Picker onEmojiClick={handleEmojiClick} pickerStyle={{maxHeight:"200px"}} /> 
    </div>
  )
}

export default EmojiButton