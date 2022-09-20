import { useState } from "react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Radio, Space, Table, Typography } from "antd";
import cln from "classnames";
import useSWR from "swr";

import MasterLayout from "../../components/master-layout";
import clientPromise from "../../utils/mongodb";
import { columns } from "../../models/employees";
import styles from "./styles.module.less";

const { Title } = Typography;

export default function Employees({ isConnected }) {
    const { data, error } = useSWR('/api/employees', fetcher)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columnsWithActions = [...columns, {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="text" icon={<EditFilled />} onClick={showModal} />
                <Button type="text" icon={<DeleteFilled />} />
            </Space>
        ),
    }];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit = (values) => {
        setIsModalOpen(false);
    };

    return (
        <MasterLayout>
            <Space>
                <h3 className={styles.pageHeaderTitle}>Employees</h3>
                <p>{isConnected && 'MongoDB Connected!'}</p>
            </Space>
            <Card className={cln(styles.recordCardList)}>
                <Table dataSource={data} columns={columnsWithActions} />
                <CollectionCreateUpdateForm open={isModalOpen} action="Edit" onSubmit={onSubmit} onCancel={handleCancel} />
            </Card>
        </MasterLayout>
    );
}

export async function getServerSideProps(context) {
    try {
        await clientPromise
        // `await clientPromise` will use the default database passed in the MONGODB_URI
        // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
        //
        // `const client = await clientPromise`
        // `const db = client.db("myDatabase")`
        //
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands

        return {
            props: { isConnected: true },
        }
    } catch (e) {
        console.error(e)
        return {
            props: { isConnected: false },
        }
    }
}

const fetcher = (url) => fetch(url).then((res) => res.json());

const CollectionCreateUpdateForm = ({ open, action, onSubmit, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal 
            title={action} 
            open={open} 
            okText={action}
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
            onCancel={onCancel}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Title level={5}>Employee id# - Employee Name</Title>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item name="login">
                    <Input placeholder="Login" />
                </Form.Item>
                <Form.Item name="salary">
                    <Input placeholder="Salary" />
                </Form.Item>
            </Form>
        </Modal>
    );
};