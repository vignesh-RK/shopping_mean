import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import{ Items }from './items.model'
import{ Orders }from './order.model'
@Injectable()
export class ItemsService {
  selectedItem:Items;
  item:Items[];
orders:Orders[];

  readonly baseURL = '/api/items';

   readonly orderURL='/api/orders'


  constructor(private http: HttpClient) { }

  getitems(){
    return this.http.get(this.baseURL)
  }
  updateItems(items:Items){
  return this.http.patch(this.baseURL+'/' +items._id,items)
  }
  getorders(){
    return this.http.get(this.orderURL)
  }

  saveOrder(order:Orders){
    return this.http.post(this.orderURL,order)
  }
  deleteOrder(order:Orders){
    return this.http.delete(this.orderURL+'/'+order._id)
  
  }
}
