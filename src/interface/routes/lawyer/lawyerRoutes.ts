//  Importing required modules and classes
import { Router } from "express";
import { LawyerController } from "../../controllers/lawyer/lawyerController";
import { upload } from "../../../infrastructure/services/cloudinary/CloudinaryConfig"; 
import { LawyerLogoutController } from "../../controllers/lawyer/lawyerLogoutController";

const router = Router();



const controller = new LawyerController();
const lawyerLogoutController = new LawyerLogoutController()

router.post(
  "/verifyDetils",
  upload.array("documents"), 
  (req, res) => controller.registerLawyer(req, res)
);
router.post('/logout',(req,res) => lawyerLogoutController.handle(req,res))


export default router;
