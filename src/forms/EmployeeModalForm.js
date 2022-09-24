import { useEffect } from "react";
import { Form, Input, Modal, Typography } from "antd";
import generateEmployeeId from "../utils/generateEmployeeId";

const { Title } = Typography;

export default function EmployeeModalForm({ open, action, data, totalCount, onSubmit, onCancel }) {
    const [form] = Form.useForm();
    const handleOnCancel = () => {
        if (onCancel) {
            form.resetFields();
            onCancel();
        }
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue({ ...data });
        }
    }, [data]);

    return (
        <Modal
            title={action?.title} 
            open={open} 
            okText={action?.submitButton}
            cancelText="Cancel"
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onSubmit(values);
                    })
                    .catch((info) => {
                        console.error('Validate Failed:', info);
                    });
            }} 
            onCancel={handleOnCancel}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    employee_id: generateEmployeeId(totalCount + 1),
                }}
            >
                {data && (
                    <Title level={5}>Employee {data?.employee_id} - {data?.employee_name}</Title>
                )}
                <Form.Item name="_id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="employee_id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="employee_name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Name is required!',
                        },
                    ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item 
                    name="employee_login"
                    label="Login"
                    rules={[
                        {
                            required: true,
                            message: 'Login is required!',
                        },
                    ]}
                >
                    <Input placeholder="Login" />
                </Form.Item>
                <Form.Item 
                    name="employee_salary"
                    label="Salary"
                    rules={[
                        {
                            required: true,
                            message: 'Salary is required!',
                        },
                    ]}
                >
                    <Input placeholder="Salary" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
