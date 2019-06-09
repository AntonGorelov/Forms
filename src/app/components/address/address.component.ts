// ANGULAR
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

// RXJS
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// SERVICES
import { StepperService } from '../../services';

// MAPS
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {} from 'googlemaps';
declare var google: any;


interface Marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, AfterViewInit {

  public latitude = 39.8282;
  public longitude = -98.5795;
  public zoom = 13;

  public markers: Marker[] = [
    {
      name: 'Address 1',
      lat: 39.8282,
      lng: -98.5795,
      draggable: true
    }
  ];

  private _autocompleteSubject$ = new Subject<void>();

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
      private _stepperService: StepperService,
      private _mapsAPILoader: MapsAPILoader,
      private _ngZone: NgZone
  ) {}

  public ngOnInit(): void {
    // this.setCurrentPosition();

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

  public ngAfterViewInit(): void {
    // this.initAutocomplete();
  }

  public initAutocomplete(): void {
    this._mapsAPILoader.load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

        autocomplete.addListener('place_changed', () => {
          this._autocompleteSubject$.next();
        });
      });
  }

  private _setCurrentPosition(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  // <--------------- Handlers --------------->

  public mapClicked($event: any): void {
    const newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    };
    this.markers.push(newMarker);
  }

}
