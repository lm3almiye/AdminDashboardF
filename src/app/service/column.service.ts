import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ColumnDto } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private apiService: ApiService) { }

  getAll(url: string): Observable<ColumnDto[]> {
    return this.apiService.get<ColumnDto[]>(`${url}Column/GetAll`, {responseType: 'json'});
  }

  getById(url: string, id: number): Observable<ColumnDto> {
    return this.apiService.get<ColumnDto>(`${url}/${id}`, {responseType: 'json'});
  }

  add(url: string, column: ColumnDto): Observable<ColumnDto> {
    return this.apiService.post<ColumnDto>(`${url}Column/Add`, {responseType: 'json'}, column);
  }

  update(url: string, id: number, column: ColumnDto): Observable<ColumnDto> {
    return this.apiService.put<ColumnDto>(`${url}Column/Update`, {responseType: 'json'}, column);
  }

  removeById(url: string, id: number): Observable<ColumnDto> {
    return this.apiService.delete<ColumnDto>(`${url}Column/RemoveById/${id}`, {responseType: 'json'});
  }
}
