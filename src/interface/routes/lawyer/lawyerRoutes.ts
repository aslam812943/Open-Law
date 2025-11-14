//  Importing required modules and classes
import { Router } from "express";
import { LawyerController } from "../../controllers/lawyer/lawyerController";
import { upload } from "../../../infrastructure/services/cloudinary/CloudinaryConfig"; 
import { LawyerLogoutController } from "../../controllers/lawyer/lawyerLogoutController";
import { AvailabilityController } from "../../controllers/lawyer/AvailabilityController";
import { CreateAvailabilityRuleUseCase } from "../../../application/useCases/lawyer/CreateAvailabilityRuleUseCase";
import { AvailabilityRuleRepository } from "../../../infrastructure/repositories/lawyer/AvailabilityRuleRepository";



const router = Router();



const controller = new LawyerController();
const lawyerLogoutController = new LawyerLogoutController()
const availabilityRuleRepository = new AvailabilityRuleRepository()
const createAvailabilityRuleUseCase = new CreateAvailabilityRuleUseCase(availabilityRuleRepository)
const availabilityController = new AvailabilityController(createAvailabilityRuleUseCase)
router.post(
  "/verifyDetils",
  upload.array("documents"), 
  (req, res) => controller.registerLawyer(req, res)
);
router.post('/logout',(req,res) => lawyerLogoutController.handle(req,res))
router.post('/schedule/create',(req,res)=>availabilityController.createRule(req,res))


export default router;
