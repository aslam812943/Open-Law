
import { IAdminRepository } from "../../../domain/repositories/admin/IAdminRepository";
import { Admin } from "../../../domain/entities/Admin";
import { AdminModel } from "../../db/models/AdminModel";


//  AdminRepository

export class AdminRepository implements IAdminRepository {
  
  // ------------------------------------------------------------
  //  findByEmail()
  // ------------------------------------------------------------

  async findByEmail(email: string): Promise<Admin | null> {
    try {
      
      const adminDoc = await AdminModel.findOne({ email });

   
      if (!adminDoc) return null;

      
      return new Admin(
        adminDoc.id,
        adminDoc.name,
        adminDoc.email,
        adminDoc.password
      );
    } catch (error: any) {
     
    
      throw new Error("Database error while fetching admin by email.");
    }
  }

  // ------------------------------------------------------------
  // createAdmin()
  // ------------------------------------------------------------
  async createAdmin(admin: Admin): Promise<Admin> {
    try {
   
      const newAdmin = await AdminModel.create({
        name: admin.name,
        email: admin.email,
        password: admin.password,
      });

 
      return new Admin(
        newAdmin.id,
        newAdmin.name,
        newAdmin.email,
        newAdmin.password
      );
    } catch (error: any) {
    

    
      if (error.code === 11000) {
        throw new Error("Admin with this email already exists.");
      }

      throw new Error("Database error while creating new admin.");
    }
  }
}
