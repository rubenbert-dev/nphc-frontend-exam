export const columns = [
    {
        title: 'Id',
        dataIndex: 'employee_id',
        key: 'employee_id',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => b.employee_id - a.employee_id,
    },
    {
        title: 'Name',
        dataIndex: 'employee_name',
        key: 'employee_name',
        sorter: (a, b) => b.employee_name.length - a.employee_name.length,
    },
    {
        title: 'Login',
        dataIndex: 'employee_login',
        key: 'employee_login',
        sorter: (a, b) => b.employee_login.length - a.employee_login.length,
    },
    {
        title: 'Salary',
        dataIndex: 'employee_salary',
        key: 'employee_salary',
        sorter: (a, b) => Number(a.employee_salary) - Number(b.employee_salary),
    },
];

export const formFields = [
    {
        name: ['employee_id'],
        value: '',
    },
    {
        name: ['employee_name'],
        value: '',
    },
    {
        name: ['employee_login'],
        value: '',
    },
    {
        name: ['employee_salary'],
        value: '',
    },
];

export const composeEmployeeRecord = (data) => {
    if (!data || data.length === 0) {
        return [];
    }
    const transformedData = [];
    const keys = ['employee_id', 'employee_name', 'employee_login', 'employee_salary'];

    data.forEach((row) => {
        let employee = {};
        if (row.length === 4) {
            row.forEach((cell, i) => {
                employee[keys[i]] = cell;
            });
        }
        transformedData.push(employee);
    });

    return transformedData;
};