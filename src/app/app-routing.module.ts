import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Display1Component } from '../app/display1/display1.component';
import { Display2Component } from '../app/display2/display2.component';
import { Display3Component } from '../app/display3/display3.component';

const routes: Routes = [
  {path: '', redirectTo:'listaAgencias', pathMatch: 'full'},
  //{path: '', component: Display1Component, children: [
  //  {path: 'listaAgencias', component: DisplayComponent2Component},
  //]},
  {path: 'listaAgencias', component: Display2Component, runGuardsAndResolvers: 'always'},
  {path: 'detalleAgencia', component: Display3Component, runGuardsAndResolvers: 'always'},
  {path: '**', component: Display2Component, runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
