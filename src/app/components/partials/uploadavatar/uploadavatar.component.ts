import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AvatarsService } from 'src/app/services/avatars.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploadavatar',
  templateUrl: './uploadavatar.component.html',
  styleUrls: ['./uploadavatar.component.scss']
})
export class UploadavatarComponent implements OnInit {
  public dataFiles: any = [];
  public fileToSend: string;
  public previsualization: string;
  constructor(
    private sanitizer: DomSanitizer,
    private avatar: AvatarsService,
    private dialogRef: MatDialogRef<UploadavatarComponent>,
    @Inject(MAT_DIALOG_DATA) inputData) {

  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  CaptureFile(event) {
    this.fileToSend = event.target.files[0];
    this.ExtractBase64(this.fileToSend)
      .then((image: any) => {
        this.previsualization = image.base;
      })
      .catch(err => console.log(err))
  }

  UploadFile() {
    try {
      const formData = new FormData();
      formData.append('avatar', this.fileToSend);


      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
        position: 'center',
        toast: true,
        showConfirmButton: false,
      });

      Swal.showLoading();
      console.log(formData)
      this.avatar.UploadAvatar(formData)
        .subscribe(
          data => {
            Swal.close();
            this.dialogRef.close(data);
            console.log(data)
          },
          err => console.log(err)
        )
    } catch (error) {

    }
  }

  ExtractBase64 = async ($event) => new Promise((resolve, reject) => {
    try {
      const unsageImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsageImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        })
      };

      reader.onerror = error => {
        resolve({
          base: null
        })
      }
    } catch (error) {
      return null;
    }
  })

}
