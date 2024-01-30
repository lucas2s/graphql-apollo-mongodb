export class User {
  constructor(
    readonly id: string | null,
    readonly first_name: string,
    readonly last_name: string,
    readonly email: string,
    readonly active: boolean,
    readonly created_at?: Date | string,
    readonly updated_at?: Date | string
  ) {}
}