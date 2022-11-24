export interface State<T = unknown> {
  process: boolean;
  error: boolean | string;
  data: T
}
