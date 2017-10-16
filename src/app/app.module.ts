// CORE MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// MATERIAL DESIGN MODULES
import { MatToolbarModule, MatCardModule, MatButtonModule, MatListModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PersonComponent],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
