import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from './contact';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private contactsApiUrl = 'http://localhost/address_book_lumen/public/api/contacts';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET contacts from the server */
  getContacts (): Observable<Contact[]> {
      const url = `${this.contactsApiUrl}`;
      return this.http.get<Contact[]>(url)
      .pipe(
        catchError(this.handleError('getContacts', []))
      );
  }

  /** GET contact by id */
  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsApiUrl}/${id}`;

    return this.http.get<Contact>(url).pipe(
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  /** POST: add a new contact to the server */
  addContact (contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsApiUrl, contact, httpOptions).pipe(
      tap(_ => this.log(`added contact w/ id=${contact.id}`)),
      catchError(this.handleError<Contact>('addContact'))
    );
  }

  /** PUT: update the contact on the server */
  updateContact (contact: Contact, id: number): Observable<any> {
      const url = `${this.contactsApiUrl}/${id}`;

      return this.http.put(url, contact, httpOptions).pipe(
      tap(_ => this.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  /** DELETE: delete the contact from the server */
  deleteContact (contact: Contact | number): Observable<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactsApiUrl}/${id}`;

    return this.http.delete<Contact>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ContactService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`${message}`);
  }
}
