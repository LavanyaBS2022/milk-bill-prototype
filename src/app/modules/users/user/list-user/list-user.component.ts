import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort ,MatDialog} from '@angular/material';
import { UsersService } from '../../../../shared/service/users/user/users.service';
import {Router} from '@angular/router';
import { Common } from '../../../../shared/service/common/common';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public userList = new MatTableDataSource();
  // public seasonActiveStatus:boolean = false;
  public seasonActiveStatus=[];
  displayedColumns: string[] = ['sNo','user_name','email','mobile', 'user_type', 'email_verified' ,'Actions'];
  public data =[];

  constructor(
    public common: Common,
    private usersService : UsersService,
    private router:Router
) { }

  ngOnInit() {
    this.getUserListData();
  }
  applyFilter(filterValue: string) {
    this.userList.filter = filterValue.trim().toLowerCase();
  }
  public getUserListData(){
    // // console.log("reached");
    let obj={};
    this.usersService.listUsers(obj).subscribe(
      sResponseModel => {
          if(sResponseModel.data != false){
            // console.log("sResponseModel.data",sResponseModel.data);
            this.data=sResponseModel.data;
            this.userList.data =sResponseModel.data;
            this.userList.paginator = this.paginator;
            return
            
          }
          else{
            this.common.openSnackBar('No record found','', 'danger-snackbar');
          }
      },
      sError => {
        this.common.apiError(sError);
      });
  }
  public editUser(id){
    const editId = btoa(id);
    this.router.navigate(['masters/edit-user'],{queryParams:{editId}});
  }
  public deleteUser(id,subsidiary_id){
    this.common.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
    if(res){
      let index=this.userList.data.findIndex(key=>key['_id'] == id);
      // // console.log('this.userList.data',this.userList.data);
      // // console.log('index',index);
      let obj={ id : id,subsidiary_id:subsidiary_id}
      this.usersService.deleteUsers(obj).subscribe((data)=>{
         console.log("data data",data);
        if(data.data){
          this.userList.data.splice(index,1);
          this.userList.data = this.userList.data;
          this.common.openSnackBar('Successfully Deleted the record!!!','', 'success-snackbar');
        }
        else{
          this.common.openSnackBar(data.message,'', 'danger-snackbar');

        }
      },
      sError => {
          this.common.apiError(sError);
      });
    }
    });
  }
}
