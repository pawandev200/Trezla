import Agency from '../models/AgencyModel.js';

// Create a new agency profile
export const createAgency = async (req, res) => {
    const {
        agencyName, slogan, location, agencyOverview,
        numberOfEmployees, budgetRange, servicesOffered,
        expertise, industries, portfolio, pastClients, awards, yearFounded
    } = req.body;

    const logoUrl = req.file.path; // Cloudinary URL for logo

    // Extract portfolio details if any
    const portfolioItems = portfolio.map(item => ({
        image: item.image.path, // Assuming each item has an image uploaded to Cloudinary
        challenge: item.challenge,
        plan: item.plan,
        result: item.result,
        link: item.link
    }));

    try {
        const existingAgency = await Agency.findOne({ agencyName });
        if (existingAgency) {
            return res.status(400).json({ message: 'Agency with this name already exists' });
        }

        const newAgency = new Agency({
            agencyName,
            logo: logoUrl, // Save the logo URL from Cloudinary
            slogan,
            location,
            agencyOverview,
            numberOfEmployees,
            budgetRange,
            servicesOffered,
            expertise,
            industries,
            portfolio: portfolioItems, // Save the portfolio items
            pastClients,
            awards,
            yearFounded
        });

        await newAgency.save();
        res.status(201).json({ message: 'Agency profile created successfully', agency: newAgency });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get an agency profile by name
export const getAgencyByName = async (req, res) => {
    const { agencyName } = req.params;

    try {
        const agency = await Agency.findOne({ agencyName });
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found' });
        }

        res.status(200).json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an agency profile
export const updateAgency = async (req, res) => {
    const { agencyName } = req.params;
    const updates = req.body;

    try {
        const agency = await Agency.findOneAndUpdate({ agencyName }, updates, { new: true });
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found' });
        }

        res.status(200).json({ message: 'Agency profile updated successfully', agency });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an agency profile
export const deleteAgency = async (req, res) => {
    const { agencyName } = req.params;

    try {
        const agency = await Agency.findOneAndDelete({ agencyName });
        if (!agency) {
            return res.status(404).json({ message: 'Agency not found' });
        }

        res.status(200).json({ message: 'Agency profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
