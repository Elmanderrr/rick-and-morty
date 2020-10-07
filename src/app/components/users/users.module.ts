import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from 'src/app/components/users/users.component';
import { UsersStore } from 'src/app/components/users/services/users.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EditUserComponent } from 'src/app/components/users/dialog/edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    UsersStore
  ],
  entryComponents: [
    EditUserComponent
  ]
})
export class UsersModule { }
