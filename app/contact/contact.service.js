import Contact from "../contact/contact.model.js";

export const addContact = async (userId, profileId) => {
  try {
    return Contact.findOneAndUpdate(
      userId,
      { $addToSet: { contacts: profileId } },
      { upsert: true, new: true }
    ).populate({path: "contacts", populate: [{ path: "userId", select: "email phoneNo"}]});
  }
  catch(error) {
    console.log(error);
  }
}