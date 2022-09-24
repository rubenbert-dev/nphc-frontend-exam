import { nanoid } from "nanoid";

export const ValidateProps = {
    employee: {
        _id: {
            type: "string",
            default: () => nanoid(),
        },
        employee_id: { type: "string", minLength: 1, maxLength: 20 },
        employee_name: { type: "string", minLength: 1, maxLength: 50 },
        employee_login: { type: "string", minLength: 4, maxLength: 20 },
        employee_salary: { type: "string", minLength: 3, maxLength: 20 },
    },
};