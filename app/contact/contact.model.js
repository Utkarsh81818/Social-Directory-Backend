import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
  ],
},{versionKey: false});

const Contact = mongoose.model("contact", contactSchema);
export default Contact;