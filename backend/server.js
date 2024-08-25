import  express  from 'express';
import  dotenv  from 'dotenv';
import cookieParser from "cookie-parser";
import connectToMongoDB from './db/connectToMongoDB.js';
import UserRoutes from './routes/UserRoutes.js';
import AgencyRoutes from './routes/AgencyRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 3000 ; 
const app = express();
app.use(express.json());


// Routes
app.use('/api/users', UserRoutes);
app.use('/api/agencies', AgencyRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running at http://localhost:${PORT}`);
  });