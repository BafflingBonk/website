import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spell } from '../models/spell.model';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  private apiUrl = 'http://localhost:3000/api/spells';

  constructor(private http: HttpClient) {}

  // POST (create spell)
  createSpell(spell: Spell): Observable<Spell> {
    return this.http.post<Spell>(this.apiUrl, spell);
  }

  // GET all spells
  getSpells(): Observable<Spell[]> {
    return this.http.get<Spell[]>(this.apiUrl);
  }

  // GET one spell
  getSpellById(id: string): Observable<Spell> {
    return this.http.get<Spell>(`${this.apiUrl}/${id}`);
  }
}