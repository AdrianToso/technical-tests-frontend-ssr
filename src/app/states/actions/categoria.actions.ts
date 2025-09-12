import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Categoria } from '../../core/models/categoria.model';

export const CategoriaActions = createActionGroup({
  source: 'Categorias API',
  events: {
    'Load Categorias': emptyProps(),
    'Load Categorias Success': props<{ categorias: Categoria[] }>(),
    'Load Categorias Failure': props<{ error: unknown }>(),
  }
});