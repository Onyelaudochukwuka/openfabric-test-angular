import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from "rxjs";
import { Cart } from "../cart";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://openfabric-test-angular-production.up.railway.app/api';
  constructor(
    private http: HttpClient,
  ) { }
  getProducts(): Observable<{ success: boolean, products: Cart[]}> {
    return this.http.get<{ success: boolean, products: Cart[] }>(`${this.baseUrl}/product/all`)
      .pipe(
        catchError(this.handleError<{ success: boolean, products: Cart[], error?: string }>('getProducts'))
      );
  }
  getOneProduct(id: string): Observable<{ success: boolean, product: Cart | null }> {
    return this.http.get<{ success: boolean, product: Cart | null }>(`${this.baseUrl}/product/item/${id}`)
      .pipe(
        catchError(this.handleError<{ success: boolean, product: Cart | null, error?: string }>('getOneProduct'))
    );
  }
  searchProducts(search: string): Observable<{ success: boolean, products: Cart[] }> {
    return this.http.get<{ success: boolean, products: Cart[] }>(`${this.baseUrl}/product/search?name=${search}`)
      .pipe(
        catchError(this.handleError<{ success: boolean, products: Cart[], error?: string }>('searchProducts'))
      );
  }
  registerUser(user: { userName: string, email: string, password: string }): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(`${this.baseUrl}/user/register`, user)
      .pipe(
        catchError(this.handleError<{ success: boolean, message: string, error?:string }>('registerUser'))
    );
  }
  loginUser(user: { email: string, password: string }): Observable<{ success: boolean, message: string, error?: string }> {
    return this.http.post<{ success: boolean, message: string }>(`${this.baseUrl}/user/login`, user, { withCredentials: true })
      .pipe(
        catchError(this.handleError<{ success: boolean, message: string, error?: string }>('loginUser'))
    );  
  }
  logoutUser(): Observable<{ success: boolean, message: string }> {
    return this.http.get<{ success: boolean, message: string }>(`${this.baseUrl}/user/logout`, { withCredentials: true })
      .pipe(
        catchError(this.handleError<{ success: boolean, message: string, error?: string }>('logoutUser'))
    );
  }
  getUser(): Observable<{ success: boolean, user: { userName: string, email: string, history: Cart[] } }> {
    return this.http.get<{ success: boolean, user: { userName: string, email: string, history: Cart[] } }>(`${this.baseUrl}/user/get-user`, { withCredentials: true })
      .pipe(
        catchError(this.handleError<{ success: boolean, user: { userName: string, email: string, history: Cart[] }, error?: string }>('getUser'))
    );
  }
  addHistory(product: string): Observable<{ success: boolean, user: { userName: string, email: string, history: Cart[] } }> {
    return this.http.post<{ success: boolean, user: { userName: string, email: string, history: Cart[] } }>(`${this.baseUrl}/user/add-history`, { product }, { withCredentials: true })
      .pipe(
        catchError(this.handleError<{ success: boolean, user: { userName: string, email: string, history: Cart[] }, error?: string }>('getUser'))
      );
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(error.error);
    };
  }
}
