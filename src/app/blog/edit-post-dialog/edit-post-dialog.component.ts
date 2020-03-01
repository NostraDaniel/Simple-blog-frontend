import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from 'src/app/common/classes/upload-adapter';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IImage } from 'src/app/common/interfaces/image';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss']
})
export class EditPostDialogComponent implements OnInit {

  public frontImage: any = null;
  public galleryImages: any[] = [];
  private deletedGalleryImages: IImage[] = [];
  private deletedFrontImage: any = {};
  public previewUrl: any = null;
  public fileUploadProgress: string = null;
  public uploadedFilePath: string = null;
  private validImageExtentions: string[] = ['image/jpeg', 'image/jpg', 'image/png','image/gif'];

  public editor = ClassicEditor;
  public postForm = this.fb.group({
    isPublished:[false],
    title: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    content: ['', [ Validators.required, Validators.minLength(15),Validators.maxLength(10000)]],
    description: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
    isFrontPage: [false],
    frontImage: [''],
    gallery: [''],
    deletedFrontImage: [''],
    deletedGalleryImages: [''],
  });
  public submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private readonly fb: FormBuilder,
    public readonly http: HttpClient,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly postsService: PostsService
    ) {}
    
  public get title() { return this.postForm.get('title'); }
  public get content() { return this.postForm.get('content'); }
  public get description() { return this.postForm.get('description'); }

  ngOnInit() {
    console.log(this.data);
    for (const key in this.data) {
      if(
        key === 'id' ||
        key === 'gallery' ||
        key === 'frontImage' ||
        key === 'createdOn' ||
        key === '__frontImage__' ||
        key === '__gallery__'
        ) {
        continue;
      }

      this.postForm.controls[key].setValue(this.data[key]);
    }

    const frontImage = this.data['__frontImage__'];

    if(!!frontImage && frontImage.hasOwnProperty('id')) {
      this.frontImage = frontImage;
      this.previewUrl = frontImage.src;
    }
  }

  fileProgress(fileInput: any) {
    if(!!this.frontImage && this.frontImage.hasOwnProperty('id')) {
      this.deletedFrontImage = this.frontImage;
    }

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

    if(imageFile.hasOwnProperty('id')) {
      return new Observable(observer => observer.next(imageFile));
    }

    if(!this.validateFile(imageFile)) {
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    return this.postsService.uploadImage(formData) 
  }

  uploadMultipleImages(arrImageFiles) {
    if(arrImageFiles.length === 0) {
      return new Observable(observer => observer.next([]));
    }

    const formData = new FormData();
    
    arrImageFiles.forEach(image => {
      if(image.hasOwnProperty('id')) {
        return;
      }

      if(!this.validateFile(image)) {
        return;
      }

      formData.append('gallery[]', image, image.name);
    });

    return this.postsService.uploadGalleryImages(formData);
  }

  removeFrontImage() {
    if(this.frontImage.hasOwnProperty('id')) {
      this.deletedFrontImage = this.frontImage;
    }

    this.frontImage = null;
    this.previewUrl = null;
  }

  onSubmit() {
    this.submitted = true;

    if(this.postForm.valid) {
      const newImgGallery = this.galleryImages.filter(img => !img.hasOwnProperty('id'));

      this.uploadMultipleImages(newImgGallery).subscribe((galleryRes) => {
        const joinedImgArrays = this.galleryImages.filter(img => img.hasOwnProperty('id')).concat(galleryRes);
        this.postForm.controls['gallery'].setValue(joinedImgArrays);

        this.uploadImage(this.frontImage).subscribe(imageRes => {
          this.postForm.controls['frontImage'].setValue(imageRes);
          this.postForm.controls['deletedFrontImage'].setValue(this.deletedFrontImage);
          this.postForm.controls['deletedGalleryImages'].setValue(this.deletedGalleryImages);

          this.postsService.updatePost(this.postForm.value, this.data.id).subscribe(postRes => {
            // this.router.navigate([`blog/post/${postRes['id']}`]);
            this.notificator.success('Edit was successful!');
            this.dialogRef.close();
          },
          (errPost) => {
            this.notificator.error('There was problem with uploading your form.');
            this.dialogRef.close();
          });
        },
        (errFrontImg) => {
          this.notificator.error('There was problem with uploading your front image.');
          this.dialogRef.close();
        });
      },
      (errGallery) => {
        this.notificator.error('There was problem with uploading the gallery images.');
        this.dialogRef.close();
      });
    }
  }

  changeGalleryFiles(pictures) {
    this.galleryImages = pictures;
  }

  addDeletedImg(deletedPictures) {
    this.deletedGalleryImages = deletedPictures;
  }

  // Validation For Images
  validateFile(file): boolean {
    if (!!file && file['size'] > 10000000) {
      this.notificator.error("File can not be larger than 10 MB");
      
      return false;
    }

    if (!!file && !this.validImageExtentions.includes(file['type'])) {
      this.notificator.error("Invalid file format.");
       
      return false;
    }

    return true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
