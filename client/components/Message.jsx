import React, { useState } from 'react';

const Message = ({ message }) => {
  const dateTime = new Date(message.time);
  let containerMessage = message.message;

  if (message.message) {
    if (
      message.message[0].match(/[/\"/]/gi) &&
      message.message[message.message.length - 1].match(/[/\"/]/gi)
    ) {
      containerMessage = containerMessage.slice(1, containerMessage.length - 1);
    }
  }

  return (
    <div className="messageContainer">
      <div className="message">
        <div>
          {message.avatar && <img src={message.avatar} />}
          {!message.avatar && (
            <img
              src={
                'https://vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
              }
            />
          )}
          <span className="message-user">{message.username}</span>
        </div>
        <span className="message-timestamp">
          {dateTime.toLocaleTimeString()}
        </span>
      </div>
      <span className="message-message">{containerMessage}</span>
    </div>
  );
};

export default Message;
