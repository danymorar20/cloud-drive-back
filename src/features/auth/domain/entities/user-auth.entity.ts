export interface UserAuth {
  id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  cellphone: string;
  createdAt: Date;
  updatedAt: Date | null;
  status: boolean;
}