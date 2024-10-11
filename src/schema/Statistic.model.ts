import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const StatisticSchema = new Schema(
	{

		experience: {
			type: String,
			required: true,
		},

		universities: {
			type: String,
			required: true,
		},

		customers: {
			type: String,
            default:"0"
		},

		branches: {
			type: String,
            default:"0"
		},


	},
	{ timestamps: true, collection: 'statistics' },
);

export default  mongoose.model("Statistics", StatisticSchema);
