import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import Message from './Message';
import Navigation from './Navbar';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const socket = io();

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [senderId, setSenderId] = useState(null);
  const [senderAvatar, setSenderAvatar] = useState(null);

  useEffect(() => {
    const fetchAndSetSenderId = async () => {
      try {
        const response = await fetch('/api/user_id'); // update endpoint when ready
        const userId = await response.json();
        setSenderId(userId.user_id); // update properties to match up if needed
        setSenderAvatar(userId.avatar);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.status === 200) {
          const body = await response.json();
          setMessages(body.messages);
        } else {
          const error = response.json();
          throw new Error(error.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAndSetSenderId();
    fetchAllMessages();
  }, []);

  const messageElementList = messages.map((message) => (
    <Message
      key={message.message_id}
      message={message}
      avatar={message.avatar}
    />
  ));

  // Handler to update state of controlled input
  const handleMessageInput = (e) => setMessageInput(e.target.value);

  // Handler to create a new message
  const handleMessageSend = () => {
    socket.emit('send-message', {
      sender_id: senderId,
      message: messageInput,
      avatar: senderAvatar,
    });
    setMessageInput('');
  };

  // Receive new messages
  socket.on('receive-message', (message) => {
    if (message.message) {
      setMessages([...messages, message]);
    }
  });

  const handleCastVote = () => {
    socket.emit('cast-a-vote');
    setMessageInput('');
  };

  socket.on('current-players', (message) => {});

  return (
    <>
      <Navigation
        senderAvatar={senderAvatar}
        setSenderAvatar={setSenderAvatar}
      />
      <div className="chatroom">
        <div className="messages">
          <div>{messageElementList}</div>
        </div>

        <div className="message-input">
          <Form.Control
            placeholder="Say something to the chat..."
            value={messageInput}
            onChange={handleMessageInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleMessageSend();
            }}
          />
          <Button variant="dark" onClick={handleMessageSend}>
            Send
          </Button>
        </div>
        <Button variant="secondary" onClick={handleCastVote}>
          Cast a Vote!
        </Button>
      </div>
    </>
  );
};

export default Chat;
