import { propertyMap } from "../utils/json/map.json";
import { IPerson } from "./person.model";

export class IAuthorization{
    public uuid_authorization?: string;
    public register?: number;
    public submitted_at?: string;
    public holidays?: number;
    public startdate?: string;
    public enddate?: string;
    public resumework?: string;
    public total_days?: number;
    public pendingdays?: number;
    public observation?: string;
    public authorizationyear?: string;
    public user?: string;
    @propertyMap('person')
    public person?: IPerson; // IAuthorization.person = undefined;
    public personnelOfficer?: string;
    public personnelOfficerPosition?: string;
    public personnelOfficerArea?: string;
    public executiveDirector?: string;
    public executiveDirectorPosition?: string;
    public executiveDirectorArea?: string;
    

    constructor() {
        this.uuid_authorization = null;
        this.register = null;
        this.submitted_at = null;
        this.holidays = null;
        this.startdate = null;
        this.enddate = null;
        this.resumework = null;
        this.total_days = null;
        this.pendingdays = null;
        this.observation = null;
        this.authorizationyear = null;
        this.user = null;
        this.person = null;
        this.personnelOfficer = null;
        this.personnelOfficerPosition = null;
        this.personnelOfficerArea = null;
        this.executiveDirector = null;
        this.executiveDirectorPosition = null;
        this.executiveDirectorArea = null;
    }
}