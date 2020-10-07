import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User, UsersStore } from 'src/app/components/users/services/users.store';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { concat, fromEvent, merge, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, EditUserComponent, USER_DIALOG_MODAL_TYPE } from 'src/app/components/users/dialog/edit-user.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {

  constructor(private usersService: UsersStore, private dialog: MatDialog) { }

  @ViewChild('form') addUserForm: ElementRef<HTMLFormElement>;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  users$: Observable<User[]> = this.usersService.users$;
  displayedColumns: any;

  public checkedRows: Array<number> = [];

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    const search$ = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        switchMap(v => {
          return this.usersService.searchUser(v);
        })
      );

    const users$ = this.usersService.users$
      .pipe(
        switchMap(v => {
          const inputVal = this.searchInput.nativeElement.value;

          return inputVal ? this.usersService.searchUser(inputVal) : of(v);
        })
      );

    this.users$ = merge(search$, users$)

  }

  addUser(e: Event, name: string, surname: string) {
    e.preventDefault();

    this.usersService.addUser({
      name, surname
    });

    this.addUserForm.nativeElement.reset();
  }

  removeUser(user: User) {
    this.usersService.removeUser(user.id);
  }

  openEditDialog(user: User) {
    this.dialog.open(EditUserComponent, {
      data: {
        user: { ...user },
        dialogType: USER_DIALOG_MODAL_TYPE.EDIT
      } as DialogData
    });
  }

  openAddDialog() {
    this.dialog.open(EditUserComponent, {
      data: {
        user: {},
        dialogType: USER_DIALOG_MODAL_TYPE.CREATE
      } as DialogData
    });
  }

  checked($event: MatCheckbox, id: number) {
    if ($event.checked) {
      this.checkedRows.push(id);
    } else {
      this.checkedRows.splice(this.checkedRows.indexOf(id), 1);
    }
  }

  removeChecked() {
    this.checkedRows.forEach(id => {
      this.usersService.removeUser(id);
    });
    this.checkedRows = [];
  }
}
