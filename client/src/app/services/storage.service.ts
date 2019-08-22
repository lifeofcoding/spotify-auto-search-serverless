import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public set(key: string, object: any) {
    sessionStorage.setItem(key, JSON.stringify(object));
  }

  public get(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

}
