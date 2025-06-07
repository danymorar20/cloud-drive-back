export interface UserResponseDto {
  id: string | null;
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  createdAt: Date;
  updatedAt: Date | null;
  status: boolean;
}
