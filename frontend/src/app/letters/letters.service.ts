import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Letter } from '../models/letter.model';
import { LetterTransaction } from '../models/letter-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class LettersService {
  constructor(private http: HttpClient) {}

  getLetters(): Observable<Letter[]> {
    return this.http.get<Letter[]>(`${environment.apiUrl}/letters`);
  }

  getLetter(id: number): Observable<Letter> {
    return this.http.get<Letter>(`${environment.apiUrl}/letters/${id}`);
  }

  createLetter(letterData: FormData): Observable<Letter> {
    return this.http.post<Letter>(`${environment.apiUrl}/letters`, letterData);
  }

  updateLetter(id: number, updates: Partial<Letter>): Observable<Letter> {
    return this.http.put<Letter>(`${environment.apiUrl}/letters/${id}`, updates);
  }

  closeLetter(id: number, comments: string): Observable<Letter> {
    return this.http.post<Letter>(`${environment.apiUrl}/letters/${id}/close`, { comments });
  }

  getLetterTransactions(id: number): Observable<LetterTransaction[]> {
    return this.http.get<LetterTransaction[]>(`${environment.apiUrl}/letters/${id}/transactions`);
  }
}
