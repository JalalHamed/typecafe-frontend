const SendMessageID = (state = null, action) => {
  switch (action.type) {
    case "SEND_MESSAGE_ID":
      return action.payload;
    default:
      return state;
  }
};

export default SendMessageID;
