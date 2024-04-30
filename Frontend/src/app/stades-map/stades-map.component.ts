import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-stades-map',
  templateUrl: './stades-map.component.html',
  styleUrls: ['./stades-map.component.scss']
})
export class StadesMapComponent implements OnInit {

  map!: mapboxgl.Map;
  
  lat = 33.34;
  lng = 10.49;
  stadeId=""
  constructor(private route:ActivatedRoute,private http:HttpClient) {
    try {

      mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',()=>{});
      } catch (error) {
        
      }
}
  ngOnInit(): void {
    this.initializeMap()
    this.getStades()
  }

  addMarker(lng:number,lat:number,nom:string){
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<div><h1 style="text-align: center;">'+nom+'</h1></div>')
      const el = document.createElement('div');
      el.style.backgroundImage = `url("../../assets/Location1.svg")`;
      el.style.width ='40px';
      el.style.height ='40px';
      el.style.backgroundSize = '100%';
    new mapboxgl.Marker(el).setLngLat([lng,lat]).setPopup(popup).addTo(this.map)
  }

  initializeMap(){
    (mapboxgl as any).accessToken="pk.eyJ1IjoibGFzc2FkMSIsImEiOiJja252bXBkYWIwb2dwMnduanlvdzRibzE2In0.yYJ5l_HY_tJRiz1gCX-cWA"
    this.map = new mapboxgl.Map({
      container: 'map',
      style:'mapbox://styles/mapbox/streets-v11',
      zoom: 8,
      center: [this.lng, this.lat]
  })
    this.map.addControl(new mapboxgl.NavigationControl);
    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {enableHighAccuracy: true},
      trackUserLocation: true,
      showUserHeading: true})
    )   
  }

  getStades(){
    this.http.get('http://localhost:3000/stade/all').subscribe((resp:any)=>{
      resp.forEach((element:any) => {
        this.addMarker(element.coordonnes.long,element.coordonnes.lat,element.nom)
      });
  })
  }
}
