import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Settings} from "../model/settings.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://192.168.0.37:5000';

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
    return this.http.get<Settings>(`${this.apiUrl}/settings`);
  }

  updateSettings(settings: Settings): Observable<Settings> {
    return this.http.put<Settings>(`${this.apiUrl}/settings`, settings);
  }

}
