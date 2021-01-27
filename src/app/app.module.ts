import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './templates/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './templates/main/main.component';
import { NavigationComponent } from './templates/shared/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
