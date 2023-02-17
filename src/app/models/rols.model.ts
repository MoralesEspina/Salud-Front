export enum Role {
    user = 'user',
    operator = 'operator',
    admin = 'admin',
    employed = 'employed',
    boss = 'boss',
    boss2 = 'boss2',
    member = 'member'
}

export class Rol {
    id_rol: number
    id: string
    role: string
    type_rol: string


    constructor() {
      this.id = null;
      this.id_rol = 0;
      this.role = null;
      this.type_rol = null;

  }
}
