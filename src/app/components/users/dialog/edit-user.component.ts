import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, UsersStore } from 'src/app/components/users/services/users.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum USER_DIALOG_MODAL_TYPE {
  'EDIT',
  'CREATE'
}


export interface DialogData {
  user?: User;
  dialogType: USER_DIALOG_MODAL_TYPE;
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<EditUserComponent>,
              private userService: UsersStore,
              private fb: FormBuilder) { }


  public modalType = USER_DIALOG_MODAL_TYPE;
  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      name: [this.data.user.name, [Validators.required, Validators.minLength(4)]],
      surname: [this.data.user.surname, Validators.required]
    });
  }

  submit() {
    const user = {...this.editUserForm.value};

    if (this.data.dialogType === USER_DIALOG_MODAL_TYPE.CREATE) {
      this.userService.addUser(user);
    } else if (this.data.dialogType === USER_DIALOG_MODAL_TYPE.EDIT) {
      this.userService.editUser({ ...user, id: this.data.user.id});
    }

    this.dialogRef.close();
  }
}
