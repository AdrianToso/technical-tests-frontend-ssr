import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown'; 
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { provideMockStore } from '@ngrx/store/testing';

import { ProductosComponent } from './productos.component';
import { ProductoFormComponent } from 'src/app/components/producto-form/producto-form.component';

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductosComponent,
        ProductoFormComponent
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        // Módulos de PrimeNG
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        DropdownModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule
      ],
      providers: [
        provideMockStore({}),
        ConfirmationService
      ]
    });
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});