import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['In Progress', 'Testing', 'Phase 2', 'Early Stage'], default: 'In Progress' },
  progress: { type: Number, default: 0 },
  team: [String], // array of names
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
