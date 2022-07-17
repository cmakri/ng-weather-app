import { AppService } from '../app.service';
import { Component, OnInit } from '@angular/core';
import { cities } from '../data/cities';
import { City } from '../models/city';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list: any;
  currentCities: City[];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.list = [];
    // check if prefered cities exist, if yes only show those else show all
    let preferences = JSON.parse(localStorage.getItem('Preferences') || '[]');

    if (preferences.length) {
      this.currentCities = preferences;
      this.getDataForGivenList(this.currentCities);
    } else {
      this.currentCities = cities;
      this.getDataForGivenList(this.currentCities);
    }
  }

  addFavourite(item: any) {
    const preference = {
      name: item.name,
      lon: item.coord.lon,
      lat: item.coord.lat,
    };

    let preferences = JSON.parse(localStorage.getItem('Preferences') || '[]');
    if (preferences.length <= 0) {
      preferences.push(preference);
      localStorage.setItem('Preferences', JSON.stringify(preferences));
      // check if city already exists in list
    } else if (
      !preferences.some((datum: any) => datum.name === preference.name)
    ) {
      preferences.push(preference);
      localStorage.setItem('Preferences', JSON.stringify(preferences));
    }
  }



  changeCitySelection(event: any) {
    const index = this.list.findIndex(
      (obj: any) => obj.name === event.city.name
    );

    //check if city exists in list and if not add it to the list.Also call API to get info
    if (index === -1 && event.action === 'add') {
      this.currentCities.push(event.city);
      console.log(this.currentCities);
    } else if (index !== -1 && event.action === 'remove') {
      this.currentCities.splice(index, 1);
    }
    this.getDataForGivenList(this.currentCities);
  }

  async getDataForGivenList(citiesList: City[]) {

    this.list = [];
     //TODO: Not optimal - maybe use rxjs combine operator
    for (let city of citiesList) {
      let datum = await this.appService.getData(city.lon, city.lat);

      this.list.push(datum);
    }
  }
}
