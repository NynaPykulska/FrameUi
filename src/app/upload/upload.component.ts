import { Component, OnInit } from '@angular/core';
import {ImageService} from "../service/image.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  filesToUpload: File[] = [];
  filesPreview = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  log(aa: any) {
    console.log('aa', aa)
  }


  uploadFiles() {
    if (this.filesToUpload.length === 0) {
      return;
    }

  const formData: FormData = new FormData();
    this.filesToUpload.forEach(file => formData.append('file', file, file.name));
  }

  filesSelection(event: Event) {
    const files: FileList = (<HTMLInputElement>event.target)?.files;
    if (files != null) {
      this.updateFilesList(files);
    }

  }

  updateFilesList(files: FileList) {
    const length = files.length;
    for (let i = 0; i < length; i++) {
      this.filesToUpload.push(files.item(i));
      this.createImageFromBlob(files.item(i));
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      this.filesPreview.push(reader.result);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
