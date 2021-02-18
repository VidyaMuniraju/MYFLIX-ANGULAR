import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://flix-world.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // inject the httpclient module to the constructor params
  // this will provide httpclient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) { }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetSingleMovieService {
  constructor(private http: HttpClient) { }

  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetDirectorService {
  constructor(private http: HttpClient) { }

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetGenreService {
  constructor(private http: HttpClient) { }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:Username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetFavoriteMoviesService {
  constructor(private http: HttpClient) { }

  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/users/:Username/favoritemovies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class AddFavoriteMoviesService {
  constructor(private http: HttpClient) { }

  addFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + '/users/:Username/favoritemovies/:MovieID', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  constructor(private http: HttpClient) { }

  editUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + '/users/:Username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  constructor(private http: HttpClient) { }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/:Username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class DeleteFavoriteMoviesService {
  constructor(private http: HttpClient) { }

  deleteFavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/:Username/favoritemovies/:MovieID', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `ErrorStatus code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
