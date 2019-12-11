import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  sliderOn: boolean = false;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    // Check if on home page
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if(event.url === '/' || event.url === '/home') {
          this.sliderOn = true;
          return; 
        }
          
        this.sliderOn = false;
      }
    });
  }

}
