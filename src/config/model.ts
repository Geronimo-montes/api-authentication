import DB from "../database";

export abstract class Model {

	constructor() { }

	protected async executeQry(qry: string, ...params: any): Promise<any> {
		return await new Promise(
			(resolve, reject) => {
				DB.query(qry, params,
					(err, res, fields) => {
						if (err) reject(err);
						else resolve(res);
					});
			});
	}
}