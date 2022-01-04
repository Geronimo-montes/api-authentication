export interface IModelService {
  Add(): Promise<{ data, msg: string }>;
}