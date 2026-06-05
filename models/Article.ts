import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    status: String,
    views: Number
}, { timestamps: true })

const Article = mongoose.model.Article || mongoose.model("Article", ArticleSchema)

export default Article