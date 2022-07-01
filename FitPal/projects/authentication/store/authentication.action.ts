import { createAction, props} from '@ngrx/store'
import { User, UserState } from 'shared/model/user';

export const loginUser = createAction(
  '[Firebase/API] Login Student Success',
  props<{user: User }>()
);
