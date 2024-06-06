import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,FormsModule,MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

constructor(private employeeService:EmployeeService,private dialog: MatDialog) {}
ngOnInit(): void {
}
async getEmployees() {
  (await this.employeeService.getEmployees()).subscribe((data: Employee[]) => {
      console.log(data);
        data=data.filter(employee => employee.isActive===true);
    }, error => {
      console.error('Error fetching employee data:', error);
    });
}
  AddEmployee() {
          console.log('Add employee:');
            const dialogRef = this.dialog.open(AddEmployeeComponent, {
              width: '34%',
              height: '85%',
            }); 
            dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Dialog result:', result);
    } })}

    async exportToExcel() {
      (await this.employeeService.getEmployees()).subscribe((data: Employee[]) => {
        data = data.filter(employee => employee.isActive === true);
        const filteredData = data.map(employee => ({
          id: employee.id,
          first: employee.firstName,
          last: employee.lastName,
          date: employee.startDate
        }));
        const worksheet = xlsx.utils.json_to_sheet(filteredData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Employees');
        xlsx.writeFile(workbook, 'employees_data.xlsx');
      }, error => {
        console.error('Error fetching employee data:', error);
      });
    }
}
