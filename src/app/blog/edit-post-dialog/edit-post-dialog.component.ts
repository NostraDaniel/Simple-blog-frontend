import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from 'src/app/common/classes/upload-adapter';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss']
})
export class EditPostDialogComponent implements OnInit {

  public frontImage: File = null;
  public galleryImages: File[] = [];
  public previewUrl:any = null;
  public fileUploadProgress: string = null;
  public uploadedFilePath: string = null;
  private validImageExtentions: string[] = ['image/jpeg', 'image/jpg', 'image/png','image/gif'];

  public editor = ClassicEditor;
  public postForm = this.fb.group({
    isPublished:[false],
    title: [''],
    content: [''],
    description: [''],
    isFrontPage: [false],
    frontImage: [''],
    gallery: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private readonly fb: FormBuilder,
    public readonly http: HttpClient,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    ) {}

  ngOnInit() {
    console.log(this.data);
    // this.postForm.controls['frontImage'].setValue(imageRes);
    for (const key in this.data) {
      if(
        key === 'id' ||
        key === 'gallery' ||
        key === 'frontImage' ||
        key === 'createdOn'
        ) {
        continue;
      }
      console.log(this.data[key], key);
      this.postForm.controls[key].setValue(this.data[key]);
    }
  }

  fileProgress(fileInput: any) {
    this.frontImage = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    const mimeType = this.frontImage.type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();      
    
    reader.readAsDataURL(this.frontImage); 
    reader.onload = (_event) => {
      this.previewUrl = reader.result; 
    }
  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, this);
    };
  }
  
  uploadImage(imageFile) {
    if(!imageFile) {
      return new Observable(observer => observer.next({}));
    }

    if(!this.validateFile(imageFile)) {
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.post('http://localhost:4202/posts/image', formData) 
  }

  uploadMultipleImages(arrImageFiles) {
    if(arrImageFiles.length === 0) {
      return new Observable(observer => observer.next([]));
    }

    const formData = new FormData();
    
    arrImageFiles.forEach(image => {
      if(!this.validateFile(image)) {
        return;
      }

      formData.append('gallery[]', image, image.name);
    });

    return this.http.post('http://localhost:4202/posts/images', formData);
  }

  onSubmit() {
    this.uploadMultipleImages(this.galleryImages).subscribe((galleryRes) => {
      this.postForm.controls['gallery'].setValue(galleryRes);
      
      this.uploadImage(this.frontImage).subscribe(imageRes => {
        this.postForm.controls['frontImage'].setValue(imageRes);

        this.http.post('http://localhost:4202/posts', this.postForm.value).subscribe(postRes => {
          this.router.navigate([`blog/post/${postRes['id']}`]);
        });
      });
    });
  }

  changeGalleryFiles(pictures) {
    this.galleryImages = pictures;
  }

  // Validation For Images
  validateFile(file) {
    if (!!file && file['size'] > 5024000) {
      this.notificator.error("File can not be larger than 5 MB");
      
       return false;
    }

    if (!!file && !this.validImageExtentions.includes(file['type'])) {
       this.notificator.error("Invalid file format.");
       
       return false;
    }

    return true;
  }
}
