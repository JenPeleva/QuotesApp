import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { EmotionService } from './services/emotion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  title = 'app';
  emotion: string;
  showTryAgainButton: boolean;
  shouldClearAndTryAgain: Subject<boolean> = new Subject<boolean>();
  photo: any;
  showUpload: boolean = true;
  showLoading: boolean;

  private getEmotionSubscirption: Subscription;

  constructor(private emotionService: EmotionService) { }

  ngOnDestroy() {
    this.getEmotionSubscirption.unsubscribe();
  }

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
    this.getEmotionSubscirption = this.emotionService.getEmotions(photo).subscribe((data) => {
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
