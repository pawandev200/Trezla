import mongoose from 'mongoose';

// Define the Portfolio Schema
const portfolioSchema = new mongoose.Schema({
    image: {
        type: String, // URL of the image file in Cloudinary
        required: true,
    },
    challenge: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    link: {
        type: String, // Optional link to the project
        default: '',
    }
}, {
    _id: false // We don't need separate IDs for portfolio items
});

// Define the Agency Schema
const agencySchema = new mongoose.Schema({
    agencyName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    logo: {
        type: String, // URL of the image file in Cloudinary
        required: true,
    },
    slogan: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    agencyOverview: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: Number,
        required: true,
    },
    budgetRange: {
        minBudget: {
            type: Number,
            required: true,
        },
        maxBudget: {
            type: Number,
            required: true,
        },
    },
    servicesOffered: {
        type: [String], // List of services
        required: true,
    },
    expertise: {
        type: [String], // List of top 5 services
        required: true,
    },
    industries: {
        type: [String], // List of industries
        required: true,
    },
    portfolio: [portfolioSchema], // Array of portfolio items
    pastClients: {
        type: [String], // Array of client names
        required: true,
    },
    awards: [{
        awardName: {
            type: String,
            required: true,
        },
        link: {
            type: String, // Optional link
            default: '',
        },
    }],
    yearFounded: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the Agency model
const Agency = mongoose.model('Agency', agencySchema);
export default Agency;

