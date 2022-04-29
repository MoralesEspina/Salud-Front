import { propertyMap } from "../utils/json/map.json";
import { IPerson } from "./person.model";

export class RequestVacation {
    public uuid_request_vacation?: string;
    public register?: string;
    public submitted_at?: string;
    public modified_at?: string;
    public last_year_vacation?: string;
    public vacation_year_request?: string;
    public last_vacation_from?: string;
    public last_vacation_to?: string;
    public vacation_from_date?: string;
    public vacation_to_date?: string;
    public has_vacation_day?: boolean;
    public days_quantity?: number;
    public observations?: string;
    @propertyMap('person')
    public person?: IPerson;
    @propertyMap('person_service')
    public person_server?: IPerson;

    constructor() {
        this.uuid_request_vacation = null;
        this.register = null;
        this.submitted_at = (new Date().toISOString().slice(0, 19).replace('T', ' ')).toString();
        this.modified_at = (new Date().toISOString().slice(0, 19).replace('T', ' ')).toString();
        this.last_year_vacation = null;
        this.vacation_year_request = null;
        this.last_vacation_from = null;
        this.last_vacation_to = null;
        this.vacation_from_date = null;
        this.vacation_to_date = null;
        this.has_vacation_day = false;
        this.days_quantity = null;
        this.observations = null;
        this.person = new IPerson();
        this.person_server = new IPerson();
    }
}