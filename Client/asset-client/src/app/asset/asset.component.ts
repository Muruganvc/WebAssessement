import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssetService, AssetModel } from '../asset.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  uploadForm: FormGroup;
  countryList: any;
  fileToUpload: any;
  BtnText: string = 'Save';
  assetId: string = '';
  constructor(private fb: FormBuilder, private http: AssetService, public activatedRoute: ActivatedRoute) {
    this.uploadForm = this.fb.group({
      name: [, Validators.required],
      email: [, Validators.required],
      country: [, Validators.required],
      description: [, Validators.required],
      file: [,]
    });
  }

  ngOnInit(): void {
    let id;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
      if (id != undefined) {
        this.assetId = id;
        this.BtnText = 'Edit';
        this.http.getAssetById(id).subscribe(result => {
          let asset = {
            name: result.createdBy,
            country: result.country,
            email: result.email,
            description: result.description,
            file: result.fileName
          };
          this.uploadForm.setValue(asset);
        })
      }
    });

    this.http.getCountry().subscribe(result => {
      this.countryList = result.Data;
    });
  }
  onFilesChanged(value: any) {
    this.fileToUpload = value.target.files[0];
  }

  saveAsset() {
    if (this.BtnText == 'Save') {
      let value = {
        'userName': this.uploadForm.get('name')?.value,
        'email': this.uploadForm.get('email')?.value,
        'country': this.uploadForm.get('country')?.value,
        'description': this.uploadForm.get('description')?.value,
        'uploadFile': this.fileToUpload,
      } as AssetModel;

      this.http.uploadFile(value).subscribe(result => {
        if (result) {
          this.uploadForm.reset();
          this.http.showSnackbar('Saved', 'action');
        }
      });
    }
    let value = {
      'userName': this.uploadForm.get('name')?.value,
      'email': this.uploadForm.get('email')?.value,
      'country': this.uploadForm.get('country')?.value,
      'description': this.uploadForm.get('description')?.value,
      'uploadFile': this.fileToUpload,
    } as AssetModel;

    this.http.edit(this.assetId, value).subscribe(result => {
      if (result) {
        this.http.showSnackbar('Updated', 'action');
        this.uploadForm.reset();
      }
    })
  }
}