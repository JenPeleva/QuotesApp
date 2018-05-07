import { Component, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { QuotesService } from '../services/quotes.service';
import { friendlyMessages } from './friendly-messages';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html'
})
export class QuotesComponent implements OnChanges{ 
  @Input() quoteTerm: string;
  @Output() quotesLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  quote: Quote;
  friendlyMessage: string;

  constructor(private quotesService: QuotesService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["quoteTerm"]) {
      this.getQuotes();
    }
  }

  getQuotes() {
    if (this.quoteTerm) {

      switch(this.quoteTerm) {

        case "happiness": 
        this.friendlyMessage = friendlyMessages.happiness;
        break;

        case "anger": 
        this.friendlyMessage = friendlyMessages.anger;
        break;
        
        case "contempt": 
        this.friendlyMessage = friendlyMessages.contempt; 
        break;

        case "fear": 
        this.friendlyMessage = friendlyMessages.fear;  
        break;

        case "sadness": 
        this.friendlyMessage = friendlyMessages.sadness;
        this.quoteTerm = "sad";
        break;

        case "surprise": 
        this.friendlyMessage = friendlyMessages.surprise;
        this.quoteTerm = "faith";
        break;

        case "neutral": 
        this.friendlyMessage = friendlyMessages.neutral;
        break;
        
        default: 
        this.friendlyMessage = friendlyMessages.default;
      }

      this.quotesService.getQuotes(this.quoteTerm).subscribe( (data) => {

          if (data["quotes"] && data.quotes.length > 0) {
              const chosenQuote = data.quotes[Math.floor(Math.random()*data.quotes.length)];
              this.quote  = { body: chosenQuote.body, author: chosenQuote.author };
          }
          this.quotesLoaded.emit(true);
          this.quoteTerm = null;
        }
      );
    }
  }
}

interface Quote {
  body: string;
  author: string;
}
