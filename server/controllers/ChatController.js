import ChatModel from "../models/chatModel.js"
// import UserModel from "../models/userModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({    
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] }
    });

    // Respond with the chat if found
    if (chat) {
      res.status(200).json(chat);
    } else {
      // If chat is not found, respond with an appropriate message
      res.status(404).json({ message: "Chat not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

