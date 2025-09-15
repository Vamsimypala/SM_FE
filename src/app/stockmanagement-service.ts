// Import Injectable decorator to make this class available for DI
import { Injectable } from '@angular/core';
// Import HttpClient for making HTTP calls and HttpErrorResponse for error typing
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// Import Observable for async streams and throwError to rethrow errors
import { Observable, throwError } from 'rxjs';
// Import catchError operator to handle errors in observables
import { catchError } from 'rxjs/operators';

// Define the Stock model returned by backend
export interface Stock {
  // Unique product identifier
  productID: number;
  // Product name
  name: string;
  // Current quantity in stock
  quantity: number;
  // Threshold for low stock alerts
  reorderLevel: number;
}

// Define a DTO for creating/saving stock entries
export interface StockDTO {
  // Unique product identifier
  productID: number;
  // Product name
  name: string;
  // Quantity to set or save
  quantity: number;
}

// Mark this service as injectable and provided in the root injector
@Injectable({
  // Provide this service at the application root scope
  providedIn: 'root'
})
export class StockmanagementService {
  // Base URL for the stock API endpoints
  private baseUrl = 'http://localhost:8084/api/stock';

  // Inject HttpClient to perform HTTP operations
  constructor(private http: HttpClient) {}

  // Fetch stock information for a specific product ID
  getStockByProductId(productId: number): Observable<Stock> {
    // Log the outgoing request for debugging
    console.log('Calling API:', `${this.baseUrl}/${productId}`);
    // Perform GET request and attach error handler
    return this.http.get<Stock>(`${this.baseUrl}/${productId}`).pipe(
      // Normalize and propagate errors via catchError
      catchError((error) => this.handleError(error))
    );
  }

  // Increase stock for a product by a specified amount
  increaseStock(productId: number, amount: number): Observable<Stock> {
    // Log the outgoing request for debugging
    console.log('Calling API:', `${this.baseUrl}/${productId}/increase`, { amount });
    // Perform PUT request with body and attach error handler
    return this.http.put<Stock>(`${this.baseUrl}/${productId}/increase`, { amount }).pipe(
      // Normalize and propagate errors via catchError
      catchError((error) => this.handleError(error))
    );
  }

  // Decrease stock for a product by a specified amount
  decreaseStock(productId: number, amount: number): Observable<Stock> {
    // Log the outgoing request for debugging
    console.log('Calling API:', `${this.baseUrl}/${productId}/decrease`, { amount });
    // Perform PUT request with body and attach error handler
    return this.http.put<Stock>(`${this.baseUrl}/${productId}/decrease`, { amount }).pipe(
      // Normalize and propagate errors via catchError
      catchError((error) => this.handleError(error))
    );
  }

  // Retrieve a list of items that are low in stock
  getLowStockReport(): Observable<Stock[]> {
    // Log the outgoing request for debugging
    console.log('Calling API:', `${this.baseUrl}/low-stock-report`);
    // Perform GET request and attach error handler
    return this.http.get<Stock[]>(`${this.baseUrl}/low-stock-report`).pipe(
      // Normalize and propagate errors via catchError
      catchError((error) => this.handleError(error))
    );
  }

  // Save a stock record using the provided DTO
  saveStock(stockDto: StockDTO): Observable<string> {
    // Perform POST request with body and attach error handler
    return this.http.post<string>(`${this.baseUrl}/save`, stockDto).pipe(
      // Normalize and propagate errors via catchError
      catchError((error) => this.handleError(error))
    );
  }

  // Centralized error normalization for all HTTP calls
  private handleError(error: HttpErrorResponse) {
    // Extract HTTP status code if available
    const status = error?.status;
    // Extract backend payload (could be string or object)
    const backend = error?.error;

    // Default fallback message
    let message = 'Request failed';
    // If backend returned a plain string, use it directly
    if (typeof backend === 'string' && backend.trim().length > 0) {
      message = backend;
    // If backend returned an object, try well-known fields
    } else if (backend && typeof backend === 'object') {
      // Prefer a 'message' field when present
      if (typeof backend.message === 'string' && backend.message.trim().length > 0) {
        message = backend.message;
      // Some APIs place the message under 'error'
      } else if (typeof backend.error === 'string' && backend.error.trim().length > 0) {
        message = backend.error;
      // Or sometimes under 'detail'
      } else if (typeof backend.detail === 'string' && backend.detail.trim().length > 0) {
        message = backend.detail;
      }
    // Fall back to HttpErrorResponse.message if available
    } else if (typeof error?.message === 'string' && error.message.trim().length > 0) {
      message = error.message;
    }

    // Rethrow a normalized error object to subscribers
    return throwError(() => ({ status, message, error: backend ?? error }));
  }
}
