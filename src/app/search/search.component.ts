import { Component, OnInit, inject} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ 
    MatFormField, 
    MatInput, 
    MatLabel, 
    HttpClientModule, 
    CommonModule, 
    RouterModule, 
    FormsModule 
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  httpClient = inject(HttpClient);
  data: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get('https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion.json')
      .subscribe((response: any) => {
        this.data = Object.values(response.data);
        this.filteredData = this.data;
      });
  }

  search() {
    console.log('Search term:', this.searchTerm);
    if (this.searchTerm) {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredData = this.data.filter(champion => 
        champion.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        champion.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        champion.blurb.toLowerCase().includes(lowerCaseSearchTerm) ||
        champion.tags.some((tag: string) => tag.toLowerCase().includes(lowerCaseSearchTerm))
      );
      //console.log(this.filteredData); // debug
    } else {
      this.filteredData = this.data;
    }
    //console.log('Filtered data:', this.filteredData);
  }

  trackById(index: number, champion: any): number {
    return champion.id;
  }
}
