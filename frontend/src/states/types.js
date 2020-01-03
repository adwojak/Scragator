// @flow
export type InitialStateType = $ReadOnly<{|
  isLogged: boolean,
  burgerMenuVisible: boolean
|}>;

export type ActionReturnType = $ReadOnly<{|
  type: string,
  payload: Object
|}>;
