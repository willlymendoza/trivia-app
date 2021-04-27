import { Dispatch } from '../types/Dispatch.type';
import { State } from './State.interface';

export interface AppStateContextProps {
  state: State;
  dispatch: Dispatch;
}
