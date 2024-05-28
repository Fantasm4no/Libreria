import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"fir-auth-910f2","appId":"1:207960344490:web:58f1a87923e076e4990dd3","storageBucket":"fir-auth-910f2.appspot.com","apiKey":"AIzaSyAb-3f3K866_Qg3X-QOxstmyZheuwZkNJs","authDomain":"fir-auth-910f2.firebaseapp.com","messagingSenderId":"207960344490"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"fir-auth-910f2","appId":"1:207960344490:web:58f1a87923e076e4990dd3","storageBucket":"fir-auth-910f2.appspot.com","apiKey":"AIzaSyAb-3f3K866_Qg3X-QOxstmyZheuwZkNJs","authDomain":"fir-auth-910f2.firebaseapp.com","messagingSenderId":"207960344490"})), provideAuth(() => getAuth()), importProvidersFrom(
    AngularFireModule.initializeApp(environment.firebaseConfig), BrowserAnimationsModule, ToastrModule.forRoot())]
};
