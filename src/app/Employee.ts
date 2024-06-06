// import { EmployeeRolePostModel } from "./EmployeeRolePostModel";

// export class Employee {
//     identity: string;
//     firstName: string;
//     lastName: string;
//     startOfWorkDate: Date;
//     dateOfBirth: Date;
//     maleOrFemale: boolean;
//     roleEmployees: EmployeeRolePostModel[];

//     constructor(identity: string, firstName: string, lastName: string, startOfWorkDate: Date, dateOfBirth: Date, maleOrFemale: boolean, roleEmployees: EmployeeRolePostModel[]) {
//       this.identity = identity;
//       this.firstName = firstName;
//       this.lastName = lastName;
//       this.startOfWorkDate = startOfWorkDate;
//       this.dateOfBirth = dateOfBirth;
//       this.maleOrFemale = maleOrFemale;
//       this.roleEmployees = roleEmployees;
//     }
//   }
export class Employee {
  id!: number;
  tz!: string;
  firstName!: string;
  lastName!: string;
  startDate!: Date;
  dateBorn!: Date;
  isMale!: boolean;
  roles: any;
  isActive:boolean
  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.tz = data.tz;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.startDate = new Date(data.startDate);
      this.dateBorn = new Date(data.dateBorn);
      this.isMale = Boolean(data.isMale);
      this.roles = data.roles;
      this.isActive=data.isActive;
    }
  }
}