import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects'
import { AppState } from "shared/services/app.state";
import { Store } from '@ngrx/store';
import { AuthService } from "shared/services/authorization/auth.service";
import * as AuthActions from './authentication.action'
import { switchMap } from "rxjs";

@Injectable()
export class AuthenticationEffects {
  constructor(
    private action$: Actions,
    private store$: Store<AppState>,
    private AuthService: AuthService
  ){}

  // @Effect()
  // loginStudent$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(AuthActions.loginUser),
  //     switchMap((action) =>
  //       this.AuthService.SignIn(action.user.email, action.user.password).pipe((result) => console.log(result))
  //     )
  //   )
  // );

}
