import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  httpClient = inject(HttpClient);

  data: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
    .get('https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion.json')
    .subscribe((response: any) => {
      //console.log(response);
      this.data = Object.values(response.data);
    });
  }

  trackById(index: number, champion: any): number {
    return champion.id;
  }
}
