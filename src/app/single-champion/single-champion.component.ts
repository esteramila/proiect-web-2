import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Firestore, collection, doc, setDoc, collectionData } from '@angular/fire/firestore';  // <-- Modified
import { updateDoc } from '@angular/fire/firestore';
import { increment } from 'firebase/firestore';
import { FirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-single-champion',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatIconModule,
    FirestoreModule
  ],
  templateUrl: './single-champion.component.html',
  styleUrl: './single-champion.component.css'
})
export class SingleChampionComponent implements OnInit{
  //httpClient = inject(HttpClient);
  championId: any;
  champion: any;
  likeClicked = false;  // Property to track if the like button is clicked
  dislikeClicked = false; // Property to track if the dislike button is clicked

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { // Subscribe to route parameter changes
      this.championId = params['id']; // Get the champion ID from the route parameters
      this.fetchChampion(this.championId); // Fetch champion data using the ID
    });
  }

  fetchChampion(championId: string) {
    const version = '14.11.1'; // Specify the correct version
    const language = 'en_US'; // Specify the correct language
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${championId}.json`; // Construct the URL
    this.httpClient
    .get(url)
    .subscribe((response: any) => {
      this.champion = response.data[championId]; // Save champion data to the property
    }, (error: any) => {
      console.error('Error fetching champion data:', error);
    });
  }

  trackById(index: number, champion: any): number {
    return champion.id;
  }

  async plusLikes(championId: string) {
    try {
      const docRef = doc(collection(this.firestore, 'champions'), championId); // Create document reference for the specific champion
      await updateDoc(docRef, { // Update document data in Firestore
        like: increment(1), // Increment the like field by 1
      });
      this.likeClicked = true; // Mark like button as clicked
      console.log('Likes successfully updated');
    } catch (error) {
      console.error('Error updating likes: ', error);
    }
  }
  
  async plusDislikes(championId: string) {
    try {
      const docRef = doc(collection(this.firestore, 'champions'), championId); // Create document reference for the specific champion
      await updateDoc(docRef, { // Update document data in Firestore
        dislike: increment(1), // Increment the dislike field by 1
      });
      this.dislikeClicked = true; // Mark like button as clicked
      console.log('Dislikes successfully updated');
    } catch (error) {
      console.error('Error updating dislikes: ', error);
    }
  }

  async minusLikes(championId: string) {
    try {
      const docRef = doc(collection(this.firestore, 'champions'), championId); // Create document reference for the specific champion
      await updateDoc(docRef, { // Update document data in Firestore
        like: increment(-1), // Decrement the like field by 1
      });
      this.likeClicked = false; // Unmark like button as clicked
      console.log('Likes successfully updated');
    } catch (error) {
      console.error('Error updating likes: ', error);
    }
  }
  
  async minusDislikes(championId: string) {
    try {
      const docRef = doc(collection(this.firestore, 'champions'), championId); // Create document reference for the specific champion
      await updateDoc(docRef, { // Update document data in Firestore
        dislike: increment(-1), // Decrement the dislike field by 1
      });
      this.dislikeClicked = false; // Unmark like button as clicked
      console.log('Dislikes successfully updated');
    } catch (error) {
      console.error('Error updating dislikes: ', error);
    }
  }

  // Method to handle like button click
  handleLikeClick(championId: string) {
    if (this.likeClicked) {
      this.minusLikes(championId);
    } else {
      this.plusLikes(championId);
    }
  }

  // Method to handle dislike button click
  handleDislikeClick(championId: string) {
    if (this.dislikeClicked) {
      this.minusDislikes(championId);
    } else {
      this.plusDislikes(championId);
    }
  }

}


