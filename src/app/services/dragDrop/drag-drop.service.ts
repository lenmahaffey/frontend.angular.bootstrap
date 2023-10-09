import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  dropped:  Subject<any> = new Subject<any>()

  dropObject(obj: any)
  {
    this.dropped.next(obj);
  }
}
