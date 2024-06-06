import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './Employee';
import { PostEmployee } from './PostEmployee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'api/Employee';

  constructor(private http: HttpClient) { }

  async getEmployees(): Promise<Observable<Employee[]>> {
    return await this.http.get<Employee[]>('https://localhost:7048/api/Employee');
  }
  async getEmployeeById(id: number): Promise<Observable<Employee>> {
    return await this.http.get<Employee>(`https://localhost:7048/api/Employee/${id}`);
}
async updataEmployee(id: string, employee: PostEmployee): Promise<Observable<Employee>> {
  employee.isMale = Boolean(employee.isMale);
  return await this.http.put<Employee>(`https://localhost:7048/api/Employee/${id}`, employee);
}
  createEmployee(employee: PostEmployee): Observable<any>{
    console.log('post sended');
    employee.isMale = Boolean(employee.isMale);
    return  this.http.post<PostEmployee>(`https://localhost:7048/api/Employee/add`,employee);
  }
deleteEmployee(employee:Employee): Observable<Employee> {
  return this.http.delete<Employee>(`https://localhost:7048/api/Employee/${employee.tz}`)
}
}

