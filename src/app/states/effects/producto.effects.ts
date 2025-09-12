import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductoService } from '../../core/services/producto.service';
import { ProductoActions } from '../actions/producto.actions';

@Injectable()
export class ProductoEffects {
  constructor(
    private actions$: Actions,
    private productoService: ProductoService
  ) {}

  loadProductos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductoActions.loadProductos),
      switchMap(action =>
        this.productoService.getProductos(action.pageNumber, action.pageSize).pipe(
          map((pagedResult) => ProductoActions.loadProductosSuccess({ pagedResult })),
          catchError((error) => of(ProductoActions.loadProductosFailure({ error })))
        )
      )
    )
  );

  addProducto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductoActions.addProducto),
      concatMap((action) =>
        this.productoService.createProducto(action.producto).pipe(
          map((producto) => ProductoActions.addProductoSuccess({ producto })),
          catchError((error) => of(ProductoActions.addProductoFailure({ error })))
        )
      )
    )
  );

  updateProducto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductoActions.updateProducto),
      concatMap((action) =>
        this.productoService.updateProducto(action.producto).pipe(
          map((producto) => ProductoActions.updateProductoSuccess({ producto })),
          catchError((error) => of(ProductoActions.updateProductoFailure({ error })))
        )
      )
    )
  );

  deleteProducto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductoActions.deleteProducto),
      concatMap((action) =>
        this.productoService.deleteProducto(action.id).pipe(
          map(() => ProductoActions.deleteProductoSuccess({ id: action.id })),
          catchError((error) => of(ProductoActions.deleteProductoFailure({ error })))
        )
      )
    )
  );
}