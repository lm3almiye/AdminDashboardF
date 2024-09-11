import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Tache, TacheDto } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService: ApiService) { }
  getAll(url: string): Observable<TacheDto[]> {
    return this.apiService.get<TacheDto[]>(`${url}Tache`, {responseType: 'json'});
  }

  getById(url: string, id: number): Observable<TacheDto> {
    return this.apiService.get<TacheDto>(`${url}Tache/${id}`, {responseType: 'json'});
  }

  add(url: string, tacheDto: Tache): Observable<TacheDto> {
    return this.apiService.post<TacheDto>(`${url}Tache/Add`, {responseType: 'json'}, tacheDto);
  }

  update(url: string, id: number, tacheDto: TacheDto): Observable<void> {
    return this.apiService.put<void>(`${url}Tache/${id}`, {responseType: 'json'}, tacheDto);
  }

  removeById(url: string, id: number): Observable<void> {
    return this.apiService.delete<void>(`${url}Tache/${id}`, {responseType: 'json'});
  }
}
