import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Settings} from "../model/settings.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'https://frameapi.pagekite.me';

  constructor(private http: HttpClient) { }

  getImagesList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/images`);
  }

  getImage(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/images/${id}`, { responseType: 'blob' });
  }

  uploadImage(files: FormData): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/images`, files)
  }

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${this.apiUrl}/config`);
  }

  updateSettings(settings: Settings): Observable<Settings> {
    return this.http.post<Settings>(`${this.apiUrl}/config`, settings);
  }

}
