import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

import { Producto } from '../../core/models/producto.model';
import { Categoria } from '../../core/models/categoria.model';

import { ProductoActions } from '../../states/actions/producto.actions';
import { CategoriaActions } from '../../states/actions/categoria.actions';

import { selectAllProductos, selectProductoLoading, selectProductoTotalCount } from '../../states/selectors/producto.selectors';
import { selectAllCategorias } from '../../states/selectors/categoria.selectors';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos$: Observable<Producto[]>;
  loading$: Observable<boolean>;
  totalCount$: Observable<number>;
  categorias$: Observable<Categoria[]>;

  displayForm = false;
  productoSeleccionado: Producto | null = null;

  constructor(private store: Store, private confirmationService: ConfirmationService) {
    this.productos$ = this.store.select(selectAllProductos);
    this.loading$ = this.store.select(selectProductoLoading);
    this.totalCount$ = this.store.select(selectProductoTotalCount);
    this.categorias$ = this.store.select(selectAllCategorias);
  }

  ngOnInit(): void {
    this.store.dispatch(CategoriaActions.loadCategorias());
  }

  loadProductos(event: TableLazyLoadEvent) {
    const pageNumber = (event.first || 0) / (event.rows || 5) + 1;
    const pageSize = event.rows || 5;
    this.store.dispatch(ProductoActions.loadProductos({ pageNumber, pageSize }));
  }

  iniciarNuevoProducto() {
    this.productoSeleccionado = null;
    this.displayForm = true;
  }

  editarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    this.displayForm = true;
  }

  guardarProducto(producto: Producto) {
    if (producto.id) {
      this.store.dispatch(ProductoActions.updateProducto({ producto }));
    } else {
      const { id: _, ...productoSinId } = producto;
      this.store.dispatch(ProductoActions.addProducto({ producto: productoSinId }));
    }
    this.productoSeleccionado = null;
  }

  eliminarProducto(id: string) {
    this.confirmationService.confirm({
       message: '¿Seguro de que quieres eliminar este producto?',
        header: 'Confirmar Eliminación',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptLabel: 'Sí',
        rejectLabel: 'No',
      accept: () => {
        this.store.dispatch(ProductoActions.deleteProducto({ id }));
      }
    });
  }
}