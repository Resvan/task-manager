import mongoose, { Document, Model } from "mongoose";

interface ProjectAttrs {
    name: string;
    description?: string;
    createdBy: mongoose.Types.ObjectId; 
    users: mongoose.Types.ObjectId[]; 
}

interface ProjectModel extends Model<ProjectDoc> {
    build(attrs: ProjectAttrs): ProjectDoc;
}

export interface ProjectDoc extends Document {
    name: string;
    description?: string;
    createdBy: mongoose.Types.ObjectId;
    users: mongoose.Types.ObjectId[];
}

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User' 
    }]
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

projectSchema.statics.build = (attrs: ProjectAttrs) => {
    return new Project(attrs);
}

const Project = mongoose.model<ProjectDoc, ProjectModel>('Project', projectSchema);

export { Project };
