import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './pages/tabla/tabla.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';

const routes: Routes = [
  { path:'tabla', component:TablaComponent},
  {path: 'encuesta', component:EncuestaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
