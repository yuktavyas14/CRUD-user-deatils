import { Injectable } from '@angular/core';
import { UserData } from './data';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 data:UserData[]=[];
  form: any;

  constructor() { }

  getUsersFromData():UserData[]{
    var ldata:any=localStorage.getItem('userdetails');
    return (ldata==null)?[]:JSON.parse(ldata) ;
  }
  populateForm( d:any){
    this.form.setValue(d);
  }


}
