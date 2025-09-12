import { createActionGroup, props } from '@ngrx/store';
import { Producto } from '../../core/models/producto.model';
import { PagedResult } from '../../core/models/paged-result.model';

export const ProductoActions = createActionGroup({
  source: 'Productos API',
  events: {
    // Iniciar carga de productos
    'Load Productos': props<{ pageNumber: number, pageSize: number }>(),
    'Load Productos Success': props<{ pagedResult: PagedResult<Producto> }>(),
    'Load Productos Failure': props<{ error: unknown }>(),

    // Añadir producto
    'Add Producto': props<{ producto: Omit<Producto, 'id'> }>(),
    'Add Producto Success': props<{ producto: Producto }>(),
    'Add Producto Failure': props<{ error: unknown }>(),

    // Actualizar producto
    'Update Producto': props<{ producto: Producto }>(),
    'Update Producto Success': props<{ producto: Producto }>(),
    'Update Producto Failure': props<{ error: unknown }>(),

    // Borrar producto
    'Delete Producto': props<{ id: string }>(),
    'Delete Producto Success': props<{ id: string }>(),
    'Delete Producto Failure': props<{ error: unknown }>(),
  }
});