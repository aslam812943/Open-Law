

import { Router } from "express";

// Controllers
import { LawyerController } from "../../controllers/lawyer/lawyerController";
import { LawyerLogoutController } from "../../controllers/lawyer/lawyerLogoutController";
import { AvailabilityController } from "../../controllers/lawyer/AvailabilityController";

// Cloudinary Upload Service
import { upload } from "../../../infrastructure/services/cloudinary/CloudinaryConfig";

// Repository
import { AvailabilityRuleRepository } from "../../../infrastructure/repositories/lawyer/AvailabilityRuleRepository";

// Use Cases 
import { CreateAvailabilityRuleUseCase } from "../../../application/useCases/lawyer/CreateAvailabilityRuleUseCase";
import { UpdateAvailabilityRuleUseCase } from "../../../application/useCases/lawyer/UpdateAvailabilityRuleUseCase";
import { GetAllAvailableRuleUseCase } from "../../../application/useCases/lawyer/GetAllAvailabilityRulesUseCase";
import { DeleteAvailableRuleUseCase } from "../../../application/useCases/lawyer/DeleteAvailabileRuleUseCase";

// Create Express Router Instance
const router = Router();

// ============================================================================
//  Controller Instances
// ============================================================================
const lawyerController = new LawyerController();
const lawyerLogoutController = new LawyerLogoutController();

// ============================================================================
//  Availability Rule Setup (Repository + UseCases + Controller)
// ============================================================================

// Repository instance
const availabilityRuleRepository = new AvailabilityRuleRepository();

// UseCase instances
const createAvailabilityRuleUseCase = new CreateAvailabilityRuleUseCase(availabilityRuleRepository);
const updateAvailabilityRuleUseCase = new UpdateAvailabilityRuleUseCase(availabilityRuleRepository);
const getAllAvailableRuleUseCase = new GetAllAvailableRuleUseCase(availabilityRuleRepository);
const deleteAvailableRuleUseCase = new DeleteAvailableRuleUseCase(availabilityRuleRepository);

// Availability Controller 
const availabilityController = new AvailabilityController(
  createAvailabilityRuleUseCase,
  updateAvailabilityRuleUseCase,
  getAllAvailableRuleUseCase,
  deleteAvailableRuleUseCase
);

// ============================================================================
//  Lawyer Routes
// ============================================================================

router.post(
  "/verifyDetils",
  upload.array("documents"),
  (req, res) => lawyerController.registerLawyer(req, res)
);


router.post("/logout", (req, res) =>
  lawyerLogoutController.handle(req, res)
);



//  Schedule Management Routes

router.post("/schedule/create", (req, res) =>
  availabilityController.createRule(req, res)
);


router.put("/schedule/update/:ruleId", (req, res) =>
  availabilityController.updateRule(req, res)
);


router.get("/schedule/:lawyerId", (req, res) =>
  availabilityController.getAllRuls(req, res)
);

router.delete("/schedule/delete/:ruleId", (req, res) =>
  availabilityController.DeleteRule(req, res)
);


export default router;
