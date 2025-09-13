import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// NgRx
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// PrimeNG
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


//app modules and components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductosComponent } from './pages/productos/productos.component';


import { productoReducer } from './states/reducers/producto.reducer';
import { ProductoEffects } from './states/effects/producto.effects';
import { categoriaReducer } from './states/reducers/categoria.reducer';
import { CategoriaEffects } from './states/effects/categoria.effects';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ProductoFormComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // PrimeNG
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    TooltipModule,
    InputTextareaModule,
    InputTextModule,
    ConfirmDialogModule,
    // NgRx
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
