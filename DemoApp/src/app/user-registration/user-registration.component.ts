import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Profile } from 'src/model/profile';
import { ProfileService } from 'src/service/profile.service';
 
 
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
   
  base64Image: string | ArrayBuffer | null = null;

  states: string[] = [
    'Karnataka',
    'Mumbai',
    'Andra Pradesh',
    'Chennai',
    'Delhi',
    'Kerala',
  ];
  countries: string[] = [
    'India'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient,private profile:ProfileService,private route:Router,public dialog: MatDialog) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required,Validators.minLength(3),],
      lastName: ['', Validators.required,Validators.minLength(3),],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(  '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$')]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      tags: ['', Validators.required],
      imageUrl:['',Validators.required]
    });
  }

   
  triggerFileInput() {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  profilePhotoString: string = "../../assets/profile.jpg";

  onFileSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
        const base64String = loadEvent.target?.result as string;
        this.profilePhotoString = base64String;
        // You can now use the base64String as needed
      };

      reader.readAsDataURL(file);
    }
  }

  tags: string[] = [];

  addTag(tag: string) {
    if (tag) {
      this.tags.push(tag);
      this.registrationForm.controls['tags'].setValue('');
    }
  }

  removeTag(sc: any) {
    const index = this.tags.indexOf(sc);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  data() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      alert('Please correct the errors in the form.');
      return;
    }
     
     
    const formData:Profile=this.registrationForm.value as Profile;
    formData.imageUrl=this.profilePhotoString;
    this.profile.saveProfile(formData).subscribe(
      (response: Profile) => {
        console.log('Profile saved successfully:', response);
        alert('Profile saved successfully!');
         this.dialog.closeAll();
        this.route.navigateByUrl("/profile");
      },
      (error) => {
        console.error('Error saving profile:', error);
        alert('An error occurred while saving the profile.');
      }
    );
  
  }
}
