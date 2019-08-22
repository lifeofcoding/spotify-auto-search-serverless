import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public authorized: boolean;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.authorized$.subscribe(authorized => {
      console.log('Authorized subscriber: ' + authorized);
      this.authorized = authorized;
    });
  }

  public connectToSpotify() {
    this.spotifyService.triggerAuthorizationFlow();
  }

}
