import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }


  get(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/artwork/${id}`);
  }

}
