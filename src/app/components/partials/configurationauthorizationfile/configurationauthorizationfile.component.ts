import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthorizationConfigurationFile } from 'src/app/models/authorizationConfiguration';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TestConfigurationAuthorizationFile } from 'src/app/utils/reports/testConfigurationAuthorization';
import Swal from 'sweetalert2';
import pdfFonts from '../../../fonts/custom/times-new-roman';

@Component({
  selector: 'app-configurationauthorizationfile',
  templateUrl: './configurationauthorizationfile.component.html',
  styleUrls: ['./configurationauthorizationfile.component.scss']
})
export class ConfigurationauthorizationfileComponent implements OnInit {
  url: string;

  form: FormGroup;
  public dataFiles: any = [];
  public fileToSend: string;
  public previsualization: string;
  alignItems: { align: string, alignment: string }[] = [
    {
      align: "Centrado",
      alignment: "center"
    },
    {
      align: "Izquierda",
      alignment: "left"
    },
    {
      align: "Derecha",
      alignment: "right"
    },
    {
      align: "Justificado",
      alignment: "justify"
    },
  ]

  constructor(
    private authorizationConfiguration: AuthorizationService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ConfigurationauthorizationfileComponent>,
    @Inject(MAT_DIALOG_DATA) inputData) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.url = inputData.url;
  }

  authorizationConfigurationInfo = new AuthorizationConfigurationFile();
  ngOnInit() {
    this.form = this.fb.group({
      width: ['', Validators.required],
      height: ['', Validators.required],
      align: ['', Validators.required],
    })
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

  get f() { return this.form.controls }

  async Test() {
    if (!this.fileToSend) {

      Swal.fire({
        allowOutsideClick: false,
        icon: 'warning',
        text: 'No ha cargado la imagen',
        position: 'top-right',
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    }
    if (this.form.invalid) {
      return
    }

    this.authorizationConfigurationInfo = this.form.value;
    this.authorizationConfigurationInfo.fileName = this.previsualization;
    await TestConfigurationAuthorizationFile(this.authorizationConfigurationInfo).then(pdf => pdf.create().open())

  }

  UploadFile() {
    try {
      if (!this.fileToSend) {

        Swal.fire({
          allowOutsideClick: false,
          icon: 'warning',
          text: 'No ha cargado la imagen',
          position: 'bottom-right',
          toast: true,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
        return;
      }

      if (this.form.invalid) {
        return
      }
      this.authorizationConfigurationInfo = this.form.value;

      const formData = new FormData();
      formData.append('watermark', this.fileToSend);
      formData.append('width', this.authorizationConfigurationInfo.width);
      formData.append('height', this.authorizationConfigurationInfo.height);
      formData.append('align', this.authorizationConfigurationInfo.align);


      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
        position: 'center',
        toast: true,
        showConfirmButton: false,
      });

      Swal.showLoading();

      this.authorizationConfiguration.SendConfigurationFile(formData, this.url)
        .subscribe(data => {
          Swal.close();

          Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            text: 'Configuración cargada exitosamente',
            position: 'top-right',
            toast: true,
            showConfirmButton: false,
            timer: 2000,
          });

          this.dialogRef.close(data);
        }, err => console.log(err))

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
