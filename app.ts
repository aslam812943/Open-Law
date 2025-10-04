import express from "express";
import dotenv from "dotenv";
import userRoutes from './src/interface/routes/user/  userRoutes'
import { DbConnection } from './src/config/mongoose/DbConnection'

dotenv.config();

const app = express();

DbConnection.connect();

app.use(express.json());

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
