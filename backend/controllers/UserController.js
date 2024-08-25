import User from "../models/UserModel.js";


export const signup = async (req, res) => {
	try {
		const { email, password, confirmPassword, roles } = req.body; 

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({email});
		if (user) return res.status(400).json({ error: "Username already exists" });
		
        // creating a new user in out db
		const newUser = new User({ email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

		// if (newUser) {
		// 	// Generate JWT token here
		// 	generateTokenAndSetCookie(newUser._id, res);
		// 	await newUser.save();

        //     // after saving it in db, sending it as respons to the client 
		// 	res.status(201).json({
		// 		_id: newUser._id,
		// 		fullName: newUser.fullName,
		// 		username: newUser.username,
		// 		profilePic: newUser.profilePic,
		// 	});
		// } else {
		// 	res.status(400).json({ error: "Invalid user data" });
		// }
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
        return; 
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
        // if user not exist then compare with " ", bcoz in db user's password also not exist, so compare entered password with empty string
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); 
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// generateTokenAndSetCookie(user._id, res);
 
        // after successfull checking and given a jwt token to user, send this message
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		// res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};