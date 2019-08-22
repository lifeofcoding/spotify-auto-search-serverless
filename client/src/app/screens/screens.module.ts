import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SpotifyCallbackComponent } from './spotify-callback/spotify-callback.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MainComponent,
    SpotifyCallbackComponent
  ],
  exports: [
    MainComponent,
    SpotifyCallbackComponent
  ]
})
export class ScreensModule { }
