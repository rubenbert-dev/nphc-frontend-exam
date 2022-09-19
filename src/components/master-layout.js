import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import cln from 'classnames';

import utilStyles from '../styles/utils.module.less';
import styles from './master-layout.module.less';

const { Header, Sider, Content, Footer } = Layout;
const name = 'Pingz Pong';

export default function MasterLayout({ children, header }) {
    const PageHeader = () => header || null;
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className={styles.masterLayout}>
            <Sider trigger={null} collapsed={collapsed} collapsible>
                <Image
                    priority
                    src="/images/profile.jpg"
                    className={cln([utilStyles.borderCircle])}
                    height={108}
                    width={108}
                    alt={name}
                />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: (
                                <Link href="/employees">
                                    <a>Employees</a>
                                </Link>
                            ),
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: (
                                <Link href="/users-upload">
                                    <a>Users Upload</a>
                                </Link>
                            ),
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header className={styles.masterContentMainHeader}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: styles.masterSiderTrigger,
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content>{children}</Content>
                <Footer className={cln(styles.masterFooter)}>footer</Footer>
            </Layout>
        </Layout>
    );
}