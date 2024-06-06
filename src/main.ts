import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';


// for firebase
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const firebaseConfig = {
  apiKey: "AIzaSyDC1lXOzUoVcmJb9nIzzMJ_Af_M18YoEyQ",
  authDomain: "proiect-web-an2sem2.firebaseapp.com",
  projectId: "proiect-web-an2sem2",
  storageBucket: "proiect-web-an2sem2.appspot.com",
  messagingSenderId: "704869122572",
  appId: "1:704869122572:web:c87616bc8559f546d32429"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    importProvidersFrom(BrowserAnimationsModule)
  ]
})
.catch(err => console.error(err));
