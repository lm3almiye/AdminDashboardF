import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../environment/environment';
import { Partner, RepresentantEntreprise } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private apiService: ApiService) { }
  getPartners(): Observable<RepresentantEntreprise[]> {
    return this.apiService.get(`${environment.apiUrl}RepresantantEntreprise/GetAll`,{responseType:'json'});
  }
  add(partner: Partner): Observable<RepresentantEntreprise>{
    return this.apiService.post(`${environment.apiUrl}RepresantantEntreprise/Add`,{responseType: 'json'},partner);
  }
  removeById(url: string, id: number): Observable<void> {
    return this.apiService.delete<void>(`${url}RepresantantEntreprise/${id}`, {responseType: 'json'});
  }
}
