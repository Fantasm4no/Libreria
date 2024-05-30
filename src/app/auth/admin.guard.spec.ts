import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { }

  canActivate() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return of(false);
        }
        return this.afs.doc<any>(`users/${user.uid}`).valueChanges().pipe(
          map(userData => {
            if (!userData || userData.role !== 'admin') {
              this.router.navigate(['/']);
              return false;
            }
            return true;
          })
        );
      })
    );
  }
}

