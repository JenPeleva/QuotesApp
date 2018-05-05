import { Component, Output, Input, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  @Input() shouldClearAndTryAgain: any;
  @Output() photoUploaded: EventEmitter<any> = new EventEmitter<any>();

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const photo = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event: any) => {
        this.photoUploaded.emit(event.target.result);
      }
      reader.readAsDataURL(photo);
    }
    else {
      this.photoUploaded.emit(null);
    }
  }
}
