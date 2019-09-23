import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './apiService';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    HttpModule,
    BrowserModule, 
    NgxPaginationModule,
     FormsModule,
    ReactiveFormsModule
      ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
