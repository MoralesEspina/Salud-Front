import { Rol } from './rols.model';

export class IUser {
    public uuid: string
    public username: string
    public pasword: string
    public rol_id: Rol
    public uuidPerson: string
    public activo: string;
    public isSelected: boolean;

    constructor() {
        this.uuid = null;
        this.username = null;
        this.pasword = null;
        this.rol_id = null;
        this.uuidPerson = null;
        this.activo = null;
        this.isSelected = undefined;
    }
}
