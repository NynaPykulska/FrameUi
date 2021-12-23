import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { PreviewComponent } from './preview/preview.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DragAndDropDirective } from './upload/drag-and-drop.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RetryInterceptor} from "./shared/interceptor/retry-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    PreviewComponent,
    DragAndDropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
