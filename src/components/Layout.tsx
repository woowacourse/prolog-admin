import React from 'react';
import { Layout } from 'react-admin';
import MyMenu from './MyMenu';

const MyLayout = (props: any) => <Layout {...props} menu={MyMenu} />;

export default MyLayout;
