import { propertyMap } from "../utils/json/map.json";
import { IPerson } from "./person.model";

export class IPermission{

    constructor(
      public submittedAt: string,
      public permissionDate: string,
      public motive: string,

      public uuidPerson: string,
      public document: string,
      public bossOne: string,
      public bossTwo: string,
      public reason: string,
      public statusBossOne: string,
      public statusBossTwo: string,
      public status: string,


    ) {

    }
}
