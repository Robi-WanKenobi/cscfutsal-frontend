import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styles: []
})
export class BannerCardComponent implements OnInit {

  @Input() imgHtml;
  @Input() textHtml;
  @Input() floatImg;

  constructor() { }

  ngOnInit(): void {
  }

}
