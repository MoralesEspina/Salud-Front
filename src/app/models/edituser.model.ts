import { Rol } from './rols.model';

export class IUser {
    public uuid: string
    public username: string
    public password: string
    public rol_id: Rol
    public role: Rol
    public uuidPerson: string
    public isSelected: boolean;

    constructor() {
        this.uuid = null;
        this.username = null;
        this.password = null;
        this.rol_id = null;
        this.uuidPerson = null;
        this.isSelected = undefined;
    }
}
