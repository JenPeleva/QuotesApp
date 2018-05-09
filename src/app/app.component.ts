import { Component } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { EmotionService } from './services/emotion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  emotion: string;
  showTryAgainButton: boolean;
  shouldClearAndTryAgain: Subject<boolean> = new Subject<boolean>();
  photo: any;
  showUpload: boolean = true;
  showLoading: boolean;

  constructor(private emotionService: EmotionService) { }

  onQuotesLoaded() {
    this.showLoading= false;
    this.showTryAgainButton = true;
  }

  onPhotoUploaded(photo: any) {
    this.photo = photo;

    if (this.photo) {
      this.showUpload = false;
      this.getEmotions(this.photo);
    }
  }

  tryAgain() {
    this.emotion = null;
    this.photo = null;
    this.showTryAgainButton = false;
    this.showUpload = true;
  }

  getEmotions(photo: any) {
    this.showLoading = true;
    this.emotionService.getEmotions(photo).subscribe((data) => {
      if (data[0] && data[0].faceAttributes && data[0].faceAttributes.emotion) {
        const emotions = data[0].faceAttributes.emotion;
        const array = Object.keys(emotions).map(key => emotions[key]);
        const max = Math.max.apply(Math, array);
        const primaryEmotion = Object.keys(emotions).find(key => emotions[key] === max );
        this.emotion = primaryEmotion;
      }
      else {
        this.emotion = "no emotion";
      }
    });
  }
}
