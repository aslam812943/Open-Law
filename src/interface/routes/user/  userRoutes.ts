
import express from "express";
import { AuthController } from "../../controllers/user/AuthController";

//  Importing all required UseCases for authentication flow
import { RegisterUserUsecase } from "../../../application/useCases/user/auth/RegisterUserUsecase";
import { VerifyOtpUseCase } from "../../../application/useCases/user/auth/VerifyOtpUseCase";
import { GenerateOtpUseCase } from "../../../application/useCases/user/auth/GenerateOtpUseCase";
import { LoginUserUsecase } from "../../../application/useCases/user/auth/LoginUserUsecase";
import { ResendOtpUseCase } from "../../../application/useCases/user/auth/ResendOtpUseCase";
import { RequestForgetPasswordUseCase } from "../../../application/useCases/user/auth/RequestForgetPasswordUseCase";
import { VerifyResetPasswordUseCase } from "../../../application/useCases/user/auth/VerifyResetPasswordUseCase";
import { ChangePasswordUseCase } from "../../../application/useCases/user/ChengePasswordUseCase";

// Cloudinary Upload Service
import { upload } from "../../../infrastructure/services/cloudinary/CloudinaryConfig";

import { verifyToken } from "../../middlewares/verifyToken";

import { GetProfileUseCase } from "../../../application/useCases/user/GetProfileUseCase";
import { GetProfileController } from "../../controllers/user/GetProfileController";

//  Importing Repositories and Services 
import { UserRepository } from "../../../infrastructure/repositories/user/UserRepository";
import { RedisCacheService } from "../../../infrastructure/services/otp/RedisCacheService";
import { NodeMailerEmailService } from "../../../infrastructure/services/nodeMailer/NodeMailerEmailService";
import { OtpService } from "../../../infrastructure/services/otp/OtpService";
import { LoginResponseMapper } from "../../../application/mapper/user/LoignResponseMapper";
import { TokenService } from '../../../infrastructure/services/jwt/TokenService'


const router = express.Router();

//  Initialize all service instances
const cacheService = new RedisCacheService();         
const otpService = new OtpService(cacheService);      
const generateOtpUseCase = new GenerateOtpUseCase(otpService); 
const mailService = new NodeMailerEmailService();     
const userRepository = new UserRepository();         
const loginResponseMapper = new LoginResponseMapper(); 
const tokenService = new TokenService();             

//  Initialize use case instances 
const requestForgetPasswordUseCase = new RequestForgetPasswordUseCase(userRepository, otpService, mailService); 
const verifyResetPasswordUseCase = new VerifyResetPasswordUseCase(userRepository, otpService);                
const verifyOtpUseCase = new VerifyOtpUseCase(userRepository, otpService);                                    
const registerUserUsecase = new RegisterUserUsecase(userRepository, generateOtpUseCase, mailService);        
const loginUserUsecase = new LoginUserUsecase(userRepository, loginResponseMapper, tokenService);               
const resendOtpUseCase = new ResendOtpUseCase(cacheService, otpService, mailService);      
const getProfileUseCase     = new GetProfileUseCase(userRepository)                 
const changePasswordUseCase = new ChangePasswordUseCase(userRepository)
 const getProfileController = new GetProfileController(getProfileUseCase,changePasswordUseCase)
const authController = new AuthController(
  registerUserUsecase,
  verifyOtpUseCase,
  loginUserUsecase,
  resendOtpUseCase,
  requestForgetPasswordUseCase,
  verifyResetPasswordUseCase
);

//  Define authentication-related API routes


router.post("/register", (req, res) => authController.registerUser(req, res));


router.post("/verify-otp", (req, res) => authController.verifyOtp(req, res));


router.post("/login", (req, res) => authController.loginUser(req, res));


router.post("/resend-otp", (req, res) => authController.resendOtp(req, res));


router.post("/forget-password", (req, res) => authController.requestForgetPassword(req, res));


router.post("/reset-password", (req, res) => authController.verifyResetPassword(req, res));


router.post('/logout',(req,res)=>authController.logoutUser(req,res))


router.get('/profile',verifyToken(['user']),(req,res)=>{getProfileController.getprofiledetils(req,res)})


router.put('/profile/profile-image', upload.single('profileImage'), (req, res) => {
  console.log("File:", req.file); 
  console.log("Body:", req.body);   
console.log('vann')
  res.status(200).json({ message: "Image uploaded" });
});


router.put("/profile/update", (req,res) =>{
 console.log('profile update ',req.body);
 res.status(200)
}


)


router.put('/profile/password',verifyToken(['user']),(req,res)=>getProfileController.chengePassword(req,res))
// router.post('/verifyDetils',(req,res)=>authController.verify(req,res))

export default router;
