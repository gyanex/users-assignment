import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IuserModel } from './IuserModel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Loader } from './loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormFieldModule, MatTableModule, MatInputModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'company'];
  dataSource!: MatTableDataSource<IuserModel>;
  protected title = 'users-app';
  http = inject(HttpClient);
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.openDialog();
    this.http
      .get<IuserModel[]>(`https://jsonplaceholder.typicode.com/users`)
      .subscribe(
        (res: IuserModel[]) => {
          this.dialog.closeAll();
          this.dataSource = new MatTableDataSource(res);
          this.setPredicate();
          console.log(res);
        },
        () => {
          this.dialog.closeAll();
          window.alert('Failed to load user');
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setPredicate() {
    this.dataSource.filterPredicate = (data: IuserModel, filter: string) => {
      const search = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(search) ||
        data.email.toLowerCase().includes(search)
      );
    };
  }

  openDialog(): void {
    this.dialog.open(Loader);
  }
}
