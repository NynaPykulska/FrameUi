import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ImageService} from "../shared/service/image.service";
import {Settings} from "../shared/model/settings.model";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  filesToUpload: File[] = [];
  filesPreview = [];
  formGroup: FormGroup;

  constructor(private imageService: ImageService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.imageService.getSettings().subscribe((settings: Settings) => {
      this.formGroup = this.formBuilder.group({
        transitionTime: settings.transitionTime,
        wakeUp: settings.wakeUp,
        sleep: settings.sleep,
        photoRetentionTime: settings.photoRetentionTime,
      })
    })
  }

  uploadFiles() {
    if (this.filesToUpload.length === 0) {
      return;
    }

    const formData: FormData = new FormData();
    this.filesToUpload.forEach(file => formData.append('file', file, file.name));
    this.imageService.uploadImage(formData).subscribe();
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

  saveSettings() {
    this.imageService.updateSettings(this.formGroup.value).subscribe();
  }
}
