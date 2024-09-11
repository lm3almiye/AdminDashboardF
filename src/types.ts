import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options{
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}
export interface Utilisateur {
    id: number;
    username: string;
    password: string;
    email: string;
    phoneNumber?: string; 
  }
  export interface LoginToken {
    token: string;
    refreshToken: string;
  }
  export interface UtilisateurDto {
    username: string;
    password: string;
    email: string;
    phoneNumber?: string; 
  }
  export interface Partner extends UtilisateurDto{
    logoURL?: string;
    companyName: string;
    location: string;
    domainName: string;
    type: string;
  }
  export interface RepresentantEntreprise extends Utilisateur {
    phoneNumber?: string | undefined;
    logoURL?: string;
    companyName: string;
    location: string;
    domainName: string;
    type: string;
  }
  export enum Niveau {
    JUNIOR = 'JUNIOR',
    SENIOR = 'SENIOR',
    EXPERT = 'EXPERT'
  }
  export interface Employe extends Utilisateur {
    joinDate: Date;
    niveau: Niveau;
  }
  export interface AdminGenerale extends Utilisateur {
  }
export interface LoginParams{
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    email: string;
    password: string;
}
export interface TacheDto {
  id: number;
  name: string;
  deadline: Date;
  utilisateurId: number;
  columnId: number;
}
export interface Tache {
  name: string;
  deadline: Date;
  utilisateurId: number;
  columnId: number;
}
export interface ColumnDto {
  id: number;
  name: string;
}
export interface UploadResponse {
  path: string;
}