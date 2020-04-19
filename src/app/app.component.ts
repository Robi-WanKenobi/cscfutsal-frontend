import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router,
              private analytics: AnalyticsService){
    this.analytics.navTrack(this.router);
  }
}
