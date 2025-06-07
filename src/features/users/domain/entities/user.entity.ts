export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public cellphone: string,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public status: boolean,
  ) {}

  static create(params: Omit<User, "updatedAt">): User {
    return new User(
      params.id,
      params.name,
      params.lastName,
      params.email,
      params.password,
      params.cellphone,
      new Date(),
      null,
      params.status,
    );
  }
}
