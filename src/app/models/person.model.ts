
import { IEspeciality } from "./especiality.model";
import { Job } from "./job.model";
import { IReubication } from "./reubication.model";
import { IWork } from "./work.model";


export class IPerson {
    public uuid: string
    public fullname: string
    public cui: string
    public partida: string
    public sueldo: number
    public admission_date: string
    public job: Job
    public work_dependency: IWork
    public especiality: IEspeciality
    public reubication: IReubication
    public renglon: string;
    public is_public_server: boolean;
    public phone: string;
    public dpi: string;
    public nit: string;
    public born_date: string;
    public email: string;
    public active: string;
    public activo: string;
    public isSelected: boolean;

    constructor() {
        this.uuid = null;
        this.fullname = null;
        this.cui = null;
        this.partida = null;
        this.sueldo = 0;
        this.admission_date = null;
        this.job = null;
        this.work_dependency = null;
        this.especiality = null;
        this.reubication = null;
        this.renglon = null;
        this.is_public_server = false;
        this.phone = null;
        this.dpi = null;
        this.nit = null;
        this.born_date = null;
        this.email = null;
        this.active = null;
        this.activo = null;
        this.isSelected = undefined;
    }
}