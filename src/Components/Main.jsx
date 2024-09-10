import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Main = () => {
    return (
        <div style={{textAlign: 'center'}}>
           <Title  level={2}>Приветствую. Это главная страница!</Title>
        </div>
    );
};

export default Main;