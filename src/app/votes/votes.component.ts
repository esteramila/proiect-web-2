import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// for database
import { Firestore, collection, doc, setDoc, collectionData } from '@angular/fire/firestore';  // <-- Modified
// import { FirebaseApp, initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyDC1lXOzUoVcmJb9nIzzMJ_Af_M18YoEyQ",
  authDomain: "proiect-web-an2sem2.firebaseapp.com",
  projectId: "proiect-web-an2sem2",
  storageBucket: "proiect-web-an2sem2.appspot.com",
  messagingSenderId: "704869122572",
  appId: "1:704869122572:web:c87616bc8559f546d32429"
};

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

@Component({
  selector: 'app-votes',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatIconModule ],
  templateUrl: './votes.component.html',
  styleUrl: './votes.component.css'
})
export class VotesComponent implements OnInit{
  httpClient = inject(HttpClient); // Inject HttpClient
  firestore = inject(Firestore);  // Inject Firestore
  data: any[] = [];
  votes: { id: string, like: number, dislike: number }[] = []; // <-- Add a new array to hold votes data

  ngOnInit(): void {
    // this.fetchData();
    this.fetchVotes();
  }

  // fetchData() {
  //   this.httpClient
  //   .get('https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion.json')
  //   .subscribe((response: any) => {
  //     //console.log(response);
  //     this.data = Object.values(response.data);
  //   });
  // }

  trackById(index: number, champion: any): number {
    return champion.id;
  }

  // async transferData() {
  //   try {
  //     for (let champion of this.data) { 
  //       const docRef = doc(collection(this.firestore, 'champions'), champion.id.toString()); // Create document reference
  //       await setDoc(docRef, { // Set document data in Firestore
  //         title: champion.title,
  //         tags: champion.tags,
  //         blurb: champion.blurb,
  //         like: 0,
  //         dislike: 0
  //       });
  //     }
  //     console.log('Data successfully written to Firestore!');
  //   } catch (error) {
  //     console.error('Error writing document: ', error);
  //   }
  // }


  fetchVotes() { // <-- Define fetchVotes function
    const championsCollection = collection(this.firestore, 'champions'); // <-- Reference to the 'champions' collection
    collectionData(championsCollection, { idField: 'id' }).subscribe((data: any[]) => {
      data.forEach(champion => { // <-- Iterate through fetched data
        const dislike = champion.dislike;
        const like = champion.like;
        // <-- Store the like and dislike counts in the votes array
        if (like > 0 || dislike > 0) {
        this.votes.push({ id: champion.id, like: like, dislike: dislike });
        }
      });
      // this.votes.forEach(vote => {
      //   console.log(`ID: ${vote.id}, Likes: ${vote.like}, Dislikes: ${vote.dislike}`);
      // });
      this.votes.sort((a, b) => b.like - a.like); // <-- Sort the votes array by likes in descending order
    });
  }
}
