import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

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

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<number>(`${this.apiUrl}/images`, file)
  }

}
