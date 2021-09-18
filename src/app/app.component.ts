import { Component, OnInit } from '@angular/core';
import { UserData } from './data';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Task';
  user: boolean = false;
  edituser: boolean = false;
  formTitle: string = 'Add User';
  btnName: string = "Submit";
  data: UserData = new UserData();
  details: UserData[] = new Array<UserData>();
  constructor(private _service: ServiceService) { }
  id: any;
  ngOnInit() {
    var res = this._service.getUsersFromData();
    if (this.details.length == 0) {
      console.log(res);
      this.details = this.details.concat(res);
    }
  }

  createUser(r_obj: any) {
    this.formTitle = 'Add User';
    this.btnName = "Save User"
    this.user = true;
  }
  editdata(r_obj: UserData) {
    this.formTitle = 'Edit User';
    this.btnName = "Update User"
    this.user = true;
    this.data = r_obj;
  }
  close(){
    this.user = false;
  }
  deleteUser(item:UserData) {
    if(confirm("Are you sure to delete "+item.firstName+ " record !")) {
    const index = this.details.indexOf(item);
    if (index > -1) {
      this.details.splice(index, 1);
      localStorage.setItem('userdetails', JSON.stringify(this.details));
    }
  }
  }
  submitdata() {
    debugger;
    if(Object.keys(this.data).length !== 0){
      if (this.data.id > 0) {
        //update
        if(confirm("Are you sure to update "+this.data.firstName +" record !")) {
        let index = this.details.indexOf(this.data);
        this.details[index] = this.data;
        }
      } else {
        //add
          var res = this._service.getUsersFromData();
          this.data.id = res.length > 0 ? res.length + 1 : 1;
          this.details.push(this.data);
      }
      this.data = new UserData();
      localStorage.setItem('userdetails', JSON.stringify(this.details));
    }
  }
}
