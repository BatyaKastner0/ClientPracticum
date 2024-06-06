import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators,ValidationErrors, ValidatorFn, FormControl, FormsModule, AbstractControl} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { RoleService } from '../role.service';
import { Role } from '../Role';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Employee } from '../Employee';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, FormsModule,MatToolbar, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatExpansionModule, MatCheckboxModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{
  roles:any
employeeForm: FormGroup;
employeeRoles: any[] = [];
  roleNames: Role[] = []
  constructor(private formBuilder: FormBuilder,public employeeService:EmployeeService,public roleService:RoleService,public dialogRef: MatDialogRef<EditEmployeeComponent>,@Inject(MAT_DIALOG_DATA) public data: { row: Employee }) {
  const roles = data.row.roles.map(role => this.formBuilder.group({
    roleId: [role.roleId, Validators.required],
    startDate: [role.startDate,Validators.required],
    isManagerial: [role.isManagerial, Validators.required],
  
    
  }));    
  console.log('roles',roles);
      this.employeeForm = this.formBuilder.group({
        tz: [data.row.tz,[Validators.required, Validators.pattern(/^\d{9}$/)]],
        firstName: [data.row.firstName, Validators.required],
        lastName: [data.row.lastName, Validators.required],
        startDate:[new Date(data.row.startDate).toISOString().split('T')[0], Validators.required],
      dateBorn: [new Date(data.row.dateBorn).toISOString().split('T')[0], Validators.required],
      isMale: [data.row.isMale.toString(),Validators.required],
      roles: this.formBuilder.array(roles) 
  });
    }


ngOnInit() {
  this.roleService.getRoles().subscribe((data: Role[]) => {
    this.roleNames = data;
 this.updateRolesOptions({ value: null, source: null, option: null });
  });
const rolesArray = this.employeeForm.get('roles') as FormArray;
console.log('rolesArray', rolesArray.value);

const filteredArray: Role[] = [];
const roleNames22 = rolesArray.controls.map(control => control.get('roleId').value);
console.log('roleNames', roleNames22);
this.roleNames = [...this.roleNames.map(role => {return {name: role.name,
  id: role.id,
disabled: roleNames22.includes(role.id) 
} as Role})
]
 console.log('this.roleNames',this.roleNames);

}
  addRole() {
    console.log('this.roleNames', this.roleNames);

    const roles = this.employeeForm.get('roles') as FormArray;
    roles.push(this.formBuilder.group({
      roleId: ['', Validators.required],
      startDate: ['', [Validators.required, this.entryDateValidator.bind(this)]],
      isManagerial: [false, Validators.required],

    }));
    console.log('roles', roles.value);
  }

  

  

  updateRolesOptions(event: any): void {

    const rolesArray = this.employeeForm.get('roles') as FormArray;
    console.log('rolesArray', rolesArray);
    
    const filteredArray: Role[] = [];
    const roleNames = rolesArray.controls.map(control => control.get('roleId').value);

    this.roleNames.forEach(element => {

      const role: Role = {
        name: element.name,
        id: element.id,
        disabled: roleNames.includes(element.id)
      };
      filteredArray.push(role);
    }
    );
    this.roleNames = filteredArray
    console.log('filteredArray', filteredArray);
  }
  removeRole(index: number): void {
    const rolesFormArray = this.employeeForm.get('roles') as FormArray;
    if (rolesFormArray.length > 1) {
      rolesFormArray.removeAt(index);
     

    }

  }
  canRemoveRole(): boolean {
    const rolesFormArray = this.employeeForm.get('roles') as FormArray;
    if (rolesFormArray.value.length === 0)
      return true
    return rolesFormArray.length > 1;
  }

  isEighteenYearsOld(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 18));

    if (selectedDate > eighteenYearsAgo) {
      return { 'underEighteen': true };
    }

    return null;
  }

  entryDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = new Date(this.employeeForm.get('startDate').value);

    if (!startDate || !control.value) {
      return null;
    }

    const entryDate = new Date(control.value);
    return entryDate >= startDate ? null : { 'entryDateInvalid': true };
  }



async saveChanges() {
this.employeeForm.get('isMale').value === 'true';
 
  const employeeData = { ...this.employeeForm.value }; 
  console.log('employeeForm', employeeData);
  if (this.employeeForm.valid) {
    console.log('Employee data to send:', employeeData);
    (await this.employeeService.updataEmployee(employeeData.tz, employeeData)).subscribe(
      (response) => {
        console.log('Employee details saved successfully:', response);
        this.dialogRef.close();
        Swal.fire({
          icon: 'success',
          title: 'employee updated successfully!   to see it in the table please refresh the page',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.error('Error saving employee details:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'An error occurred',
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  } else {
    console.log('not valid');
  }
}
  }



