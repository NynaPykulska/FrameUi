import { Component, OnInit } from '@angular/core';
import {Observable, of, switchMap, tap} from "rxjs";
import {ImageService} from "../shared/service/image.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  image: any;
  imageArray: Blob[] = [];
  private currentImageIndex = 0;
  private imageIdsList: string[] = [];
  private intervalTime = 5000;


  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImagesList().pipe(
      tap(list => this.imageIdsList = list),
      switchMap(list => this.fillImagesArray()))
      .subscribe();
  }

  loadImage() {
    this.createImageFromBlob(this.imageArray[this.currentImageIndex]);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      this.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  fillImagesArray(currentIndex: number = 0): Observable<null> {
    return this.imageService.getImage(this.imageIdsList[currentIndex]).pipe(
      tap(img => this.imageArray.push(img)),
      tap(img => {
        if (this.image == null) {
          this.loadImage();
          setInterval(() => {
            if (this.currentImageIndex < this.imageArray.length - 1) {
              this.currentImageIndex++;
            } else {
              this.currentImageIndex = 0;
            }
            this.loadImage();
          }, this.intervalTime)
        }
      }),
      switchMap(_ => {
        if (currentIndex < this.imageIdsList.length - 1) {
          return this.fillImagesArray(currentIndex + 1);
        }
        return of(null);
      }))
  }

}
