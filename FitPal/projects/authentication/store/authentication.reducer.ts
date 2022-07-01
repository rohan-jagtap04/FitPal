import { AppState } from "shared/services/app.state";
import * as AuthenticationPageActions from './authentication.action';
import { on, Action, createReducer } from '@ngrx/store';

export const featureKey = 'authenticationPageStore';

export const initialState: AppState = {
  students: {
    students:[]
  }
};

export const authenticationReducer = createReducer(
  initialState,
  on(AuthenticationPageActions.loginUser, (state) => ({
    ...state,
  }))
)
