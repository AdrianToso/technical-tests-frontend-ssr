import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/core/models/categoria.model';
import { Producto } from 'src/app/core/models/producto.model';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent implements OnChanges {
  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();
  
  @Input() producto: Producto | null = null; 
  @Input() categorias: Categoria[] | null = []; 

  
  @Output() save = new EventEmitter<Producto>();
  
  form: FormGroup;
  dialogHeader = 'Añadir Producto';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null], 
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      categoriaId: [null, Validators.required] 
    });
  }

  // Este método se activa cada vez que un @Input() cambia
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.producto) {
      // Si recibimos un producto, estamos en modo "Edición"
      this.dialogHeader = 'Editar Producto';
      this.form.patchValue(this.producto); 
    } else {
      // Si no hay producto, es "Añadir"
      this.dialogHeader = 'Añadir Producto';
      this.form.reset(); 
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.save.emit(this.form.value);
    this.closeDialog();
  }

  closeDialog() {
    this.displayChange.emit(false);
  }
}