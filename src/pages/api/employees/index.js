import nc from "next-connect";
import { deleteEmployeeById, findEmployees, insertEmployee, updateEmployeeById } from "../../../api-lib/db";
import { validateBody } from "../../../api-lib/middlewares/ajv";
import { ValidateProps } from "../../../api-lib/constants";
import { database } from "../../../api-lib/middlewares";
import { ncOpts } from "../../../api-lib/nc";

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
    const employees = await findEmployees(
        req.db,
        req.query.before ? new Date(req.query.before) : undefined,
        req.query.by,
        req.query.limit ? parseInt(5, 10) : undefined,
    );

    return res.json({ employees });
});

handler.post(
    validateBody({
        type: "object",
        properties: {
            employee_id: ValidateProps.employee.employee_id,
            employee_name: ValidateProps.employee.employee_name,
            employee_login: ValidateProps.employee.employee_login,
            employee_salary: ValidateProps.employee.employee_salary,
        },
        required: ["employee_name", "employee_login", "employee_salary"],
        additionalProperties: true,
    }),
    async(req, res) => {
        const { employee_id, employee_name, employee_login, employee_salary } = req.body;
        const employees = await insertEmployee(req.db, {
            employee_id, employee_name, employee_login, employee_salary,
        });

        return res.json({ employees });
    },
);

handler.patch(
    validateBody({
        type: "object",
        properties: {
            employee_name: ValidateProps.employee.employee_name,
            employee_login: ValidateProps.employee.employee_login,
            employee_salary: ValidateProps.employee.employee_salary,
        },
    }),
    async (req, res) => {
        const { _id, employee_id, employee_name, employee_login, employee_salary } = req.body;
        const employees = await updateEmployeeById(req.db, _id, { employee_id, employee_name, employee_login, employee_salary });

        res.json({ employees });
    },
);

handler.delete(
    async (req, res) => {
        const { _id } = req.body;
        const employees = await deleteEmployeeById(req.db, _id);

        res.json({ employees });
    },
);

export default handler;
