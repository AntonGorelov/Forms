import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { StepperService } from '../../services';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {} from 'googlemaps';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

  constructor(private _stepperService: StepperService,
              private _mapsAPILoader: MapsAPILoader,
              private _ngZone: NgZone) {}

  ngOnInit() {
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

  ngAfterViewInit() {
    // this.initAutocomplete();
  }

  public initAutocomplete() {
    this._mapsAPILoader.load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

        autocomplete.addListener('place_changed', () => {
          this._autocompleteSubject$.next();
        });
      });
  }

  private _setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  // <--------------- Handlers --------------->

  public mapClicked($event: any) {
    const newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    };
    this.markers.push(newMarker);
  }

  public markerDragEnd(marker: any, $event: any) {
    console.log('marker:', marker, ' ; event: ', $event);
  }

}
