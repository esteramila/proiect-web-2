import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"proiect-web-an2sem2","appId":"1:704869122572:web:c87616bc8559f546d32429","storageBucket":"proiect-web-an2sem2.appspot.com","apiKey":"AIzaSyDC1lXOzUoVcmJb9nIzzMJ_Af_M18YoEyQ","authDomain":"proiect-web-an2sem2.firebaseapp.com","messagingSenderId":"704869122572"})), provideAuth(() => getAuth())
  ]};
