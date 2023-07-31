export const isSameSender = (messages, message, index, userid) => {
    return (
      index < messages.length - 1 &&
      (messages[index + 1].sender?._id !== message.sender?._id ||
        messages[index + 1].sender?._id === undefined) &&
      messages[index].sender?._id !== userid
    );
  };
  
  export const isLastMessage = (messages, index, userid) => {
    return (
      index === messages.length - 1 &&
      messages[messages.length - 1].sender?._id !== userid &&
      messages[messages.length - 1].sender?._id
    );
  };