import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { EmotionService } from './services/emotion.service';
import { HttpModule } from '@angular/http';
import { QuotesService } from './services/quotes.service';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [EmotionService, QuotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
