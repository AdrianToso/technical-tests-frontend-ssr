import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';


import { productoReducer } from './states/reducers/producto.reducer';
import { ProductoEffects } from './states/effects/producto.effects';
import { categoriaReducer } from './states/reducers/categoria.reducer';
import { CategoriaEffects } from './states/effects/categoria.effects';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ProductoFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    TooltipModule,
    StoreModule.forRoot({
      productos: productoReducer,
      categorias: categoriaReducer
    }),
    EffectsModule.forRoot([ProductoEffects, CategoriaEffects]),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25,
      logOnly: environment.production }),
   
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
