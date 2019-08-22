import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './screens/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { ScreensModule } from './screens/screens.module';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyCallbackComponent } from './screens/spotify-callback/spotify-callback.component';
import { BulkSearchInputComponent } from './shared/bulk-search-input/bulk-search-input.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent},
  {
    path: 'spotifycallback',
    component: SpotifyCallbackComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BulkSearchInputComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ScreensModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
