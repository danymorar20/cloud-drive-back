export class Role {
  constructor(
    public id: number | null,
    public name: string,
    public readonly createdAt: Date,
    public updatedAt: Date | null,
    public status: boolean,
  ) {}

  static create(params: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Role {
    return new Role(
      null,
      params.name,
      new Date(),
      null,
      params.status,
    );
  }
}
