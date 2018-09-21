import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { StepperService } from '../../services';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { } from 'googlemaps';
import {Subject} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';
declare var google: any;


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, AfterViewInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;

  private _autocompleteSubject$ = new Subject<void>();

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private _stepperService: StepperService,
              private _mapsAPILoader: MapsAPILoader,
              private _ngZone: NgZone) {}

  ngOnInit() {
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.zoom = 13;
    this.setCurrentPosition();

    this._autocompleteSubject$
      .pipe(
        debounceTime(500),
      )
      .subscribe(() => {
      // const input = document.getElementById('autocomplete');
        console.log('autocomplete');
      // const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      //   types: ['places']
      // });
      //
      // this._ngZone.run(() => {
      //   const place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //   if (place.geometry === undefined || place.geometry === null) {
      //     return;
      //   }
      //   this.latitude = place.geometry.location.lat();
      //   this.longitude = place.geometry.location.lng();
      // });
    });
  }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  public initAutocomplete() {
    // const input = document.getElementById('autocomplete');

    this._mapsAPILoader.load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

        autocomplete.addListener('place_changed', () => {
          this._autocompleteSubject$.next();
        });
      });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

}
