import React from 'react';

const MessageArea = ({ messages }) => {
  const messageItems = messages.map(({ message }) => {
    return <li key={Math.random()}>{message}</li>;
  });

  return (
    <div className="message-area">
      <h3>Messages:</h3>
      <ul>{messageItems}</ul>
    </div>
  );
};

MessageArea.defaultProps = {
  messages: [],
};

export default MessageArea;
