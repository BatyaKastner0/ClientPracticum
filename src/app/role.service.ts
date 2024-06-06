import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
   getRoles():Observable<Role[]> {
    return  this.http.get<Role[]>('https://localhost:7048/api/Role');
  }

}
