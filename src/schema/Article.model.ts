import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ArticleSchema = new Schema(
	{

		articleTitle: {
			type: String,
			required: true,
		},

		articleContent: {
			type: String,
			required: true,
		},

		articleImage: {
			type: String,
		},

	},
	{ timestamps: true, collection: 'articles' },
);

export default  mongoose.model("Articles", ArticleSchema);
