import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, default: shortid.generate },
});

export default mongoose.models.Url || mongoose.model("Url", urlSchema);
