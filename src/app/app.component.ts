import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

//pagini
import { HomeComponent } from './home/home.component';
//import { SignInComponent } from './sign-in/sign-in.component';
//import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';
import { RandomChampionComponent } from './random-champion/random-champion.component';
import { SingleChampionComponent } from './single-champion/single-champion.component';
import { VotesComponent } from './votes/votes.component';

//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

//import { AuthenticationService } from './services/authentication.service';
import { routes } from './app.routes';

import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    HomeComponent,
    //SignInComponent,
    //FavoritesComponent,
    SearchComponent,
    RandomChampionComponent,
    SingleChampionComponent,
    VotesComponent,

    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}

