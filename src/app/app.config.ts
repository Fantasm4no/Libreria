import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAuth(() => getAuth()), 
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig), 
      BrowserAnimationsModule, 
      ToastrModule.forRoot()
    ), 
    provideHttpClient(withFetch()), 
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
    provideFirestore(() => getFirestore())
  ]
};
