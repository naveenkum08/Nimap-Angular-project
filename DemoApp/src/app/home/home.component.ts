import { Component } from '@angular/core';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchQuery: string = '';
  searchLocation: string='';
  selectedLocation:string='';

  option1: string='';
  option2: string='';

  constructor(public dialog: MatDialog) {
    
  }
  onSearch() {
    // Handle the search logic here
    console.log('Searching for:', this.searchQuery);
  }

  openDialog() {
    const dialogConfig = {
      width: '500px',
      height:'680px'
    };

    const dialogRef = this.dialog.open(
      UserRegistrationComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
