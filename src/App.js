import React,  { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Tree } from 'antd';
import {
  DownOutlined,
  FrownOutlined,
  SmileOutlined,
  MehOutlined,
  FrownFilled,
} from '@ant-design/icons';


const treeData = [];

function App() {

    const [owners, setOwners] = useState(false);
    const [expandedKeys, setExpandedKeys] = useState(false);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_HOST}/api/owners`)
            .then(async (response) => {
                const responseData = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = ( responseData && responseData.message) || response.statusText;
                    return Promise.reject(error);
                }

                let i=0;
                let keys = [];
                
                for (const key in responseData.data) {

                    treeData[i] = {};
                    treeData[i].title = key;
                    treeData[i].key = i;
                    treeData[i].children = [];
                    
                    keys.push(i);

                    for (const k in responseData.data[key]) {
                        let childTitle = {};
                        childTitle.title = responseData.data[key][k]
                        treeData[i].children.push(childTitle);
                    };

                    i++ ;
                } 

                setOwners(treeData);
                setExpandedKeys(keys)
            })
            .catch((error) => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <Tree
            showIcon
            defaultExpandAll
            expandedKeys={expandedKeys}
            switcherIcon={<DownOutlined />}
            treeData={owners}
        />
    );
}

export default App;
