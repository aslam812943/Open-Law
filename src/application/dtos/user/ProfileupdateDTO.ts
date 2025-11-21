export class ProfileUpdateDTO{
    constructor(
        public id:string,
        public name:string,
        public phone:string,
        public profileImage:string,
        public address:string,
        public city:string,
        public pincode:string

    ){}
}