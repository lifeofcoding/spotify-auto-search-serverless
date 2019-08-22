import { Component, Input, OnInit, Output } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { SearchResult } from '../../models/search-result.model';

@Component({
  selector: 'app-bulk-search-input',
  templateUrl: './bulk-search-input.component.html',
  styleUrls: ['./bulk-search-input.component.scss']
})
export class BulkSearchInputComponent implements OnInit {

  @Input()
  public placeholder = 'The Beatles Let It Be \nQueen Another One Bites The Dust';

  @Output()
  public result: SearchResult[];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  public bulkSearch() {
    const testString = 'Let it be the beatles';
    const queryParams = {
      q: testString,
      types: 'track'
    };
    this.spotifyService.get<SearchResult>('search')
  }

}
