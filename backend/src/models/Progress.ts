import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProgress extends Document {
  user: Types.ObjectId;
  data: Record<string, number>; // taskId -> passed tests count
}

const ProgressSchema = new Schema<IProgress>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  data: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
