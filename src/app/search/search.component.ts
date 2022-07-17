import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { cities } from '../data/cities';
import { City } from '../models/city';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  cityCtrl = new FormControl('');
  filteredCities!: Observable<City[]>;
  cities: City[] = [];
  allCities: City[] = cities;
  @ViewChild('cityInput')
  cityInput: ElementRef<HTMLInputElement>;

  @Output() changeSelectionEvent = new EventEmitter<any>();

  ngOnInit() {
    this.filteredCities = this.cityCtrl.valueChanges.pipe(
      startWith(null),
      map((name) => (name ? this.filterCities(name) : this.allCities.slice()))
    );
  }

  private filterCities(value: string) {
    return this.allCities.filter((option) => option.name.includes(value));
  }

  add(event: any): void {
    if (event.value) {
      this.cities.push(event.option.value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.cityCtrl.setValue(null);
  }

  remove(city: City): void {
    const index = this.cities.findIndex((obj) => obj.name === city.name);
    if (index >= 0) {
      this.cities.splice(index, 1);
    }

    let data = {
      city,
      action: 'remove',
    };
    this.changeSelectionEvent.emit(data);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.cities.push(event.option.value);
    this.cityInput.nativeElement.value = '';
    this.cityCtrl.setValue(null);
    let data = {
      city: event.option.value,
      action: 'add',
    };
    this.changeSelectionEvent.emit(data);
  }
}
