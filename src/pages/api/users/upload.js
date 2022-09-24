import nc from "next-connect";
import { ncOpts } from "../../../api-lib/nc";
import { database } from "../../../api-lib/middlewares";
import { composeEmployeeRecord } from "../../../models/employee";
import { insertBulkEmployees } from "../../../api-lib/db";

const handler = nc(ncOpts);

handler.use(database);

handler.post(
    async(req, res) => {
        const { data } = req.body;
        let status = 200;
        const records = composeEmployeeRecord(data);

        if (records.length > 0) {
            // Check if logins are unique
            records.forEach((record) => {
                if (records.some((item) => (item.employee_id !== record.employee_id) && (item.employee_login === record.employee_login) )) {
                    status = 422;
                }
            });
        }

        if (status !== 200) {
            let message = '';
            switch (status) {
                case 422:
                    message = 'There are duplicate employee login from the entries.';
                    break;
                default:
                    break;
            }
            return res.status(status).json({ message });
        }

        const result = await insertBulkEmployees(req.db, records);

        // console.log({ result });
        res.status(status).json({ result });
    }
);

export default handler;
