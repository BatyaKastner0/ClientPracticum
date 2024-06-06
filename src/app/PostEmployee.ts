import { EmployeeRole } from "./EmployeeRole";

export class PostEmployee {
    // id!: number;
    tz!: string;
    firstName!: string;
    lastName!: string;
    startDate!: Date;
    dateBorn!: Date;
    isMale: any;
 roles: EmployeeRole[];
isActive:boolean
    constructor(data?: any) {
      if (data) {
        // this.id = data.id;
        this.tz = data.tz;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.startDate = new Date(data.startDate);
        this.dateBorn = new Date(data.dateBorn);
        this.isMale = Boolean(data.isMale);
this.roles = data.roles;
this.isActive=true;
      }
    }
  }



