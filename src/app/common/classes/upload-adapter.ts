
export class UploadAdapter {
  constructor( 
    private loader,
    private component,
  ) {}

  async upload() {
   return this.loader.file
    .then( file => new Promise( ( resolve, reject ) => {
      this.component.uploadImage(file).subscribe(res => {
        resolve({default: res.src})
      })
    }));
  };
}