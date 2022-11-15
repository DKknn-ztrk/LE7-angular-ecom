import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageToken: LocalstorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    // Eğer localstorage de token var ise, kullanıcı giriş yaptıysa
    if (token) {
      // Dokumantasyon: Mdn Web Docs WindowOrWorkerGlobalScope.atob()
      // çıktısı console.log tokenDecode: {"userId":"63162599fe327ac355ca5068","isAdmin":true,"iat":1668055963,"exp":1668142363} bilgilerini bize veriyor
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      // Login yapan kullanıcı Admin mi? Token süresi geçmiş mi?
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) 
      // Kullanıcı admin ise ve tokenında sorun yok ise
      return true; // Return OK
    }

    // Eğer kullanıcı token e sahip değilse giriş yapmadıysa login sayfasına yönlendir
    this.router.navigate(['/login']);
    return false;
  }

  // Token zamanı bitmiş mi?
  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
