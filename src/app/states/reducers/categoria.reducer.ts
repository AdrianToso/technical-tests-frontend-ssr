import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Categoria } from '../../core/models/categoria.model';
import { CategoriaActions } from '../actions/categoria.actions';

export interface State extends EntityState<Categoria> {
  loading: boolean;
  error: unknown | null;
}

export const adapter: EntityAdapter<Categoria> = createEntityAdapter<Categoria>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});

export const categoriaReducer = createReducer(
  initialState,
  on(CategoriaActions.loadCategorias, (state) => ({ ...state, loading: true })),
  on(CategoriaActions.loadCategoriasSuccess, (state, { categorias }) =>
    adapter.setAll(categorias, { ...state, loading: false })
  ),
  on(CategoriaActions.loadCategoriasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);