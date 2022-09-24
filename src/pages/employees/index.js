import { useState } from "react";
import { EditFilled, DeleteFilled, PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, message, PageHeader, Popconfirm, Space, Table } from "antd";
import cln from "classnames";

import EmployeeModalForm from "../../forms/EmployeeModalForm";
import MasterLayout from "../../components/master-layout";
import { fetcher, useEmployees } from "../../lib/fetch";
import { columns } from "../../models/employee";
import styles from "./styles.module.less";

export default function Employees() {
    const { data, isLoading, mutate } = useEmployees();
    const [employeeData, setEmployeeData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageAction, setPageAction] = useState(null);
    const tableActions = {
        edit: {
            title: 'Edit',
            submitButton: 'Save',
        },
        add: {
            title: 'New Employee',
            submitButton: 'Save',
        },
    };
    const columnsWithActions = [...columns, {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="text" icon={<EditFilled />} onClick={showModal.bind(this, tableActions.edit, record)} />
                <Popconfirm
                    title="Are you sure？"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={(e) => onConfirmDelete(e, record)}
                >
                    <Button type="text" icon={<DeleteFilled />} />
                </Popconfirm>
            </Space>
        ),
    }];

    const showModal = (pageAction, data) => {
        setPageAction(pageAction);
        if (data) {
            setEmployeeData(data);
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setEmployeeData(null);
        setIsModalOpen(false);
    };

    const onConfirmDelete = async (e, data) => {
        try {
          e.preventDefault();
          // delete item by id
          await fetcher('/api/employees', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              _id: data._id
            }),
          });
    
          mutate('/api/employees');
          message.success('Record has been deleted');
        } catch (e) {
          message.error(e.message);
        } finally {
            setIsModalOpen(false);
        }
    };

    const onSubmit = async (values) => {
        try {
            const { _id, employee_id, employee_name, employee_login, employee_salary } = values;
            const method = _id ? 'PATCH' : 'POST';
            let reqBody = {
                employee_id,
                employee_name,
                employee_login,
                employee_salary,
            };
            if (_id) {
                reqBody = { _id, ...reqBody };
            }
            const response = await fetcher('/api/employees', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody),
            });

            mutate('/api/employees', { employees: response.employees }, false);

            message.success('Record has been saved');
        } catch (e) {
            message.error(e.message);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <MasterLayout>
            <PageHeader
                title="Employees"
                extra={[
                    <Button
                        key="1"
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={showModal.bind(this, tableActions.add, null)}
                    >
                        New
                    </Button>,
                ]}
            ></PageHeader>
            <Card className={cln(styles.recordCardList)}>
                <Table rowKey={"_id"} dataSource={data?.employees} columns={columnsWithActions} loading={isLoading} />
                <EmployeeModalForm
                    open={isModalOpen}
                    action={pageAction}
                    data={employeeData}
                    totalCount={data?.employees?.length}
                    onSubmit={onSubmit}
                    onCancel={handleCancel}
                />
            </Card>
        </MasterLayout>
    );
}
