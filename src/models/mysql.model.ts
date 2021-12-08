import { Pool } from "mysql";

export abstract class Model {

	constructor(private DB: Pool) { }

	protected async executeQry(qry: string, ...params: any): Promise<any> {
		return await new Promise(
			(resolve, reject) => {
				this.DB.query(qry, params,
					(err, res, fields) => {
						if (err) reject(err);
						else resolve(res);
					});
			});
	}
}