import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/model/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
   
  private apiUrl = 'http://localhost:3000/profile'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }

  saveProfile(formdata:any):Observable<Profile>{
    return  this.http.post<Profile>(this.apiUrl,formdata);
  }
}
