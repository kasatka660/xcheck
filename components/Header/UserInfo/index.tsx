import React from 'react';
import { user } from '../../../data/data';
import { Card } from 'antd';
export const Userinfo: React.FC = () => {
    return (
        <Card style={{ width: '300', marginLeft:'75%', marginTop:'-60px'}}>
    <p>username: {user.githubId}</p>
    <p>role: {user.roles[1]}</p>
    
  </Card>
 
    )
}