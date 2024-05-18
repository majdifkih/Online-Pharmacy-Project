import React from 'react';
import { Alert, Space } from 'antd';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';

const UnauthorisedPage = () => {
    const navigate = useNavigate();
    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
                padding: '60px',
            }}
        >
            <Alert 
                message={
                    <div style={{ display: 'flex'}}>
                        <WarningAmberIcon style={{ fontSize: '50px', color: 'red', marginRight: '10px' }} />
                        <div>
                            <h1 style={{ margin: 0 }}>Unauthorised</h1>
                            <p style={{ margin: 0 }}>You are not authorised to access this page</p>
                            <p 
                onClick={() => navigate(-1)} 
                style={{ 
                    fontWeight: 'bold', 
                    cursor: 'pointer', 
                    textDecoration: 'underline', 
                    margin: '10px 0 0 70%',
                    fontSize: '20px',
                    color: '#3C91E6'
                   
                }}
            >
                Return
            </p>
                        </div>
                    </div>
                }
                type="error"
                style={{ padding: '3%' }}
                
            />
           
        </Space>
    );
};

export default UnauthorisedPage;
