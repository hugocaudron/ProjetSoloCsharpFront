//login model
export interface AdminLogin {
  email: string;
  password: string;
}
//create admin model
export interface AdminRegister {
  email: string;
  password: string;
  confirmPassword: string;
}