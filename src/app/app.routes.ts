import { provideRouter, Routes } from '@angular/router';
import {SignInComponent} from "./views/accout/sign-in/sign-in.component";
import {SignUpComponent} from "./views/accout/sign-up/sign-up.component";
import {HomeComponent} from "./views/app/home/home.component";
import {HelpComponent} from "./views/app/help/help.component";
import {MyProfileComponent} from "./views/accout/my-profile/my-profile.component";
import {ProductCreateComponent} from "./views/app/product-create/product-create.component";
import {ProductListComponent} from "./views/app/product-list/product-list.component";
import {ProductEditComponent} from "./views/app/product-edit/product-edit.component";
import {ProductDetailComponent} from "./views/app/product-detail/product-detail.component";
import {NotFoundComponent} from "./views/not-found/not-found.component";
import {MainComponent} from "./views/app/main/main.component";
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';





export const routes: Routes = [
{
  path: "account/sign-in",
  component: SignInComponent,



},

{
  path: "account/sign-up",
  component: SignUpComponent,



},
{
  path: "",
  component: MainComponent,
  children: [

    {
      path: "",
      component: HomeComponent,



    }
    ,
    {
      path: "help",
      component: HelpComponent,



    },
     {
       path: "account/myprofile",
       component: MyProfileComponent,



     },
      {
        path: "product/create",
        component: ProductCreateComponent,



      }
      ,
      {
        path: "Product/list",
        component: ProductListComponent,



      }
      ,
      {
        path: "Product/edit",
        component: ProductEditComponent,



      }
      ,
      {
        path: "Product/detail",
        component: ProductDetailComponent,



      }
      ,
      {
        path: "**",
        component: NotFoundComponent,



      }


  ]



},













];export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
  ]
};

