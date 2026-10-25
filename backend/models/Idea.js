
import mongoose from 'mongoose'

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    links: [
      {
        url: {
          type: String,
          required: true,
        },
        label: {
          type: String,
          default: '',
        },
        note: {
          type: String,
          default: '',
        },
      },
    ],
    tasks: [
        {
            text: { type: String, required: true },
            completed: { type: Boolean, default: false },
            durationMinutes: {
                type: Number,
                default: 0,
                min: 0,
                validate: {
                    validator: Number.isInteger,
                    message: 'Duration must be an integer',
                },
            },
        },
    ],
    color: {
      type: String,
      enum: ['yellow', 'pink', 'blue', 'green', 'lavender'],
      default: 'yellow',
    },
    position: {
      x: {
        type: Number,
        default: 0,
      },
      y: {
        type: Number,
        default: 0,
      },
    },
    rotation: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
)

const Idea = mongoose.model('Idea', ideaSchema)

export default Idea
