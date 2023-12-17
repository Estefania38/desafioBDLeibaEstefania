// import chatModel from '../models/chat.model.js';

// class ChatMongo {

//   static async createChat(userEmail) {
//     const chat = await chatModel.create({ user: userEmail, messages: [] });
//     return chat;
//   }

//   static async addMessagesToChat(userEmail, message) { 
//     let chat = await chatModel.findOne({ user: userEmail });
//     if (!chat) {
//       throw new CustomError(`Chat not found for user: ${userEmail}`);
//     }
//     chat.messages.push(message);
//     await chat.save();
//   }

//   static async getMessages(userEmail) {
//     const chat = await chatModel.findOne({ user: userEmail });
//     if (!chat) {
//       throw new CustomError(`Chat not found for user: ${userEmail}`);
//     }
//     return chat.messages;
//   }

//   static async deleteChat(id) {
//     const chat = await chatModel.findByIdAndDelete(id);
//     return chat;
//   }

// }

// export default ChatMongo;