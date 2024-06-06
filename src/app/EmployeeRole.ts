export class EmployeeRole {
//   EmployeeId: number;
//   RoleId:number;
//   IsManagerial: boolean;
//   StartDate: Date;


//   constructor(EmployeeId: number,RoleId:number, IsManagerial: boolean,StartDate: Date) {
     
//       this.EmployeeId = EmployeeId;
//       this.RoleId=RoleId;
//       this.IsManagerial=IsManagerial;
// this.StartDate=StartDate
//   }
employeeId:number;
roleId:number;
name:string;
isManagerial: boolean;

constructor(name:string,roleId:number,isManagerial:boolean,employeeId:number) {
 this.roleId=roleId
  this.name=name
  this.isManagerial=isManagerial;
  this.employeeId=employeeId;
}
}
