import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoriaService } from '../../core/services/categoria.service';
import { CategoriaActions } from '../actions/categoria.actions';

@Injectable()
export class CategoriaEffects {
  constructor(
    private actions$: Actions,
    private categoriaService: CategoriaService
  ) {}

  loadCategorias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriaActions.loadCategorias),
      switchMap(() =>
        this.categoriaService.getCategorias().pipe(
          map((categorias) => CategoriaActions.loadCategoriasSuccess({ categorias })),
          catchError((error) => of(CategoriaActions.loadCategoriasFailure({ error })))
        )
      )
    )
  );
}