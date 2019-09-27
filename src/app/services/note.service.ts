import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly base = '/api/notes';

  constructor(private readonly http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.base);
  }

  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.base}/${id}`);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.base}/${note._id}`, note);
  }

  createNote(note: Note): Observable<Note> {
    console.log("note service", note)
    return this.http.post<Note>(`${this.base}`, note);
  }

  destroyNote(id: string): Observable<Note> {
    return this.http.delete<Note>(`${this.base}/${id}`);
  }

}
