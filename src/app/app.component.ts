import { Component } from '@angular/core';
import { ServiceProviderService } from './service-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  star: string;
  name: string;
  hotels = [];
  hotel: object = {
    'id': '249942',
    'name': 'Hotel Stefanos',
    'stars': 3,
    'price': 994.18,
    'image': '4900059_30_b.jpg',
    'amenities': [
      'safety-box',
      'nightclub',
      'deep-soaking-bathtub',
      'beach',
      'business-center'
    ]
  };

  constructor(private serviceProvider: ServiceProviderService) {
    this.getHotels();
  }

  getHotels() {
    this.serviceProvider.getHotels().subscribe((data) => {
      this.hotels = data;
    });
  }

  setValue() {
    console.log(this.star, this.name);
    const request: object = {
      'filter':
        {
          'name': this.name,
          'stars': this.star
        }
    }
    this.serviceProvider.getHotelsFilter(request).subscribe((data) => {
      this.hotels = data;
    });
  }
}
