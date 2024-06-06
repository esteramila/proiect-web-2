import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random-champion',
  standalone: true,
  imports: [ HttpClientModule, CommonModule],
  templateUrl: './random-champion.component.html',
  styleUrl: './random-champion.component.css'
})
export class RandomChampionComponent {
  httpClient = inject(HttpClient);
  championId: any;
  champion: any;

  ngOnInit(): void {
    this.fetchRandomChampion();
  }

  fetchRandomChampion(){
    const championsUrl = 'https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion.json';

    this.httpClient.get(championsUrl).subscribe((response: any) => {
      const championNames = Object.keys(response.data);
      const randomIndex = Math.floor(Math.random() * championNames.length);
      const randomChampionName = championNames[randomIndex];

      const championDetailUrl = `https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion/${randomChampionName}.json`;

      this.httpClient.get(championDetailUrl).subscribe((championResponse: any) => {
        this.champion = championResponse.data[randomChampionName];
      });
    }, (error) => {
      console.error("Error fetching random champion list:", error);
    });
  }
}
