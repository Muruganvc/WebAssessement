import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetViewComponent } from './asset-view/asset-view.component';
import { AssetComponent } from './asset/asset.component';

const routes: Routes = [
  {
    path: 'addAsset',
    component: AssetComponent
  },
  {
    path: 'viewAsset',
    component: AssetViewComponent
  },
  {
    path: 'addAsset/:id?',
    component: AssetComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
