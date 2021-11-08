import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  shareDataSubject = new Subject<any>()

  shareData(data: any) {
    this.shareDataSubject.next(data);
  }

  getCountry(): Observable<any> {
    return this.http.get<any>('https://api.dhsprogram.com/rest/dhs/countries');
  }

  uploadFile = (value: AssetModel): Observable<any> => {
    let fileToUpload = value.uploadFile;
    const formData = new FormData();
    if (fileToUpload) {
      formData.append('file', fileToUpload, fileToUpload.name);
    }
    formData.append('userObj', JSON.stringify(
      {
        'userName': value.userName,
        'email': value.email,
        'country': value.country,
        'description': value.description
      }
    ));
    const api = `${environment.baseApi}Upload`;
    return this.http.post<any>(api, formData, { reportProgress: true, observe: 'events' });
  }

  getAssets = (): Observable<any> => {
    const api = `${environment.baseApi}getAllAsset`;
    return this.http.get(api);
  }
  download = (name: string): Observable<any> => {
    const api = `${environment.baseApi}download?file=${name}`;
    return this.http.get(api, { responseType: 'blob' });
  }
  delete = (assetId: string): Observable<any> => {
    const api = `${environment.baseApi}deleteAsset/${assetId}`;
    return this.http.delete<any>(api);
  }
  edit = (assetId: string, value: AssetModel): Observable<any> => {
    const api = `${environment.baseApi}EditAsset/Edit`;
    let fileToUpload = value.uploadFile;
    const formData = new FormData();
    if (fileToUpload) {
      formData.append('file', fileToUpload, fileToUpload.name);
    }
    formData.append('userObj', JSON.stringify(
      {
        'userName': value.userName,
        'email': value.email,
        'country': value.country,
        'description': value.description,
        'assetId': assetId
      }
    ));
    return this.http.post<any>(api, formData, { reportProgress: true, observe: 'events' });
  }

  getAssetById = (assetId: string): Observable<any> => {
    return this.http.get<any>('https://localhost:5001/api/Upload/getAssetById/' + assetId)
  }

  showSnackbar(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}

export interface AssetModel {
  userName: string;
  email: string;
  country: string;
  description: string;
  uploadFile: File
}
