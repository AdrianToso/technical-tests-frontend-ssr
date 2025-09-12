import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Producto } from '../../core/models/producto.model';
import { ProductoActions } from '../actions/producto.actions';

export interface State extends EntityState<Producto> {
  loading: boolean;
  error: unknown | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export const adapter: EntityAdapter<Producto> = createEntityAdapter<Producto>();

export const initialState: State = adapter.getInitialState({
  loading: true,
  error: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10, 
});

export const productoReducer = createReducer(
  initialState,
  // Cargar productos
  on(ProductoActions.loadProductos, (state, { pageNumber, pageSize }) => ({
    ...state,
    loading: true,
    pageNumber,
    pageSize
  })),

  on(ProductoActions.loadProductosSuccess, (state, { pagedResult }) =>
    adapter.setAll(pagedResult.items, {
      ...state,
      loading: false,
      totalCount: pagedResult.totalCount,
    })
  ),

  on(ProductoActions.loadProductosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Añadir producto
  on(ProductoActions.addProductoSuccess, (state, { producto }) =>
    adapter.addOne(producto, state)
  ),

  // Actualizar producto
  on(ProductoActions.updateProductoSuccess, (state, { producto }) =>
    adapter.updateOne({ id: producto.id, changes: producto }, state)
  ),

  // Borrar producto
  on(ProductoActions.deleteProductoSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  )
);