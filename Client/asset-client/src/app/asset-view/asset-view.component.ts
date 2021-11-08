import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-view',
  templateUrl: './asset-view.component.html',
  styleUrls: ['./asset-view.component.css']
})
export class AssetViewComponent implements OnInit {

  constructor(private http: AssetService, private router: Router) { }
  assetDetails = new Array<any>();
  ngOnInit(): void {
    this.getAsset();
  }

  getAsset = () => {
    this.http.getAssets().subscribe(result => {
      this.assetDetails = result;
    })
  }

  downlod = (value: string, contentType: string) => {
    this.http.download(value).subscribe((result: Blob) => {
      const blob = new Blob([result], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  delete = (assetId: string) => {
    if (confirm('Do you want to delete..?')) {
      this.http.delete(assetId).subscribe(result => {
        if (result) {
          this.http.showSnackbar('Deleted', 'action');
          this.getAsset();
        }
      })
    }
  }
  edit = (assetId: string) => {
    var asset = this.assetDetails.find(f => f.assetId == assetId);
    this.http.shareData({ data: asset });
    this.router.navigate(['/addAsset', { id: assetId }]);
  }
}
