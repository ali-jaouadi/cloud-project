import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-stade-map',
  templateUrl: './stade-map.component.html',
  styleUrls: ['./stade-map.component.scss']
})
export class StadeMapComponent implements OnInit {

  map!: mapboxgl.Map;
  
  lat = 34.4891403
  lng = 10.3599389;
  stadeId=""
  constructor(private route:ActivatedRoute,private data:DataService) {
    this.route.paramMap.subscribe(params => {
      this.stadeId=params.get('id')||""
    })
try {

mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',()=>{});
} catch (error) {
  
}
}
  ngOnInit(): void {
    this.initializeMap()
    // this.addMarker(10.491022,33.343434)
    
    setTimeout(() => {
      this.getStade()
    }, 2000);
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
      zoom: 6,
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

  getStade(){
    if(this.stadeId){
      this.data.getStadeById(this.stadeId).subscribe((res:any)=>{
        console.log(res.coordonnes);
        this.addMarker(res.coordonnes.long,res.coordonnes.lat,res.nom)
        this.map.flyTo({
        center: [res.coordonnes.long,res.coordonnes.lat],
        zoom: 12,
        speed: 0.5,
        curve: 2, 
      })
      })
    }
  }
}
