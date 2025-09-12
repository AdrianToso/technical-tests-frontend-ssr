import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from '../reducers/categoria.reducer';

export const selectCategoriaState = createFeatureSelector<State>('categorias');

const { selectAll } = adapter.getSelectors();

export const selectAllCategorias = createSelector(
  selectCategoriaState,
  selectAll
);