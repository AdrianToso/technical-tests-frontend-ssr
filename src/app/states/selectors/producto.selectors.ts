import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from '../reducers/producto.reducer';

export const selectProductoState = createFeatureSelector<State>('productos');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllProductos = createSelector(
  selectProductoState,
  selectAll
);

export const selectProductoEntities = createSelector(
  selectProductoState,
  selectEntities
);

export const selectProductoLoading = createSelector(
  selectProductoState,
  (state) => state.loading
);

export const selectProductoError = createSelector(
  selectProductoState,
  (state) => state.error
);

export const selectProductoTotalCount = createSelector(
  selectProductoState,
  (state) => state.totalCount
);

export const selectProductoPageNumber = createSelector(
  selectProductoState,
  (state) => state.pageNumber
);

export const selectProductoPageSize = createSelector(
  selectProductoState,
  (state) => state.pageSize
);