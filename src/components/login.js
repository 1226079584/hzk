import React from 'react';
import axios from '../http'
import 'antd-mobile/dist/antd-mobile.css'
import './login.css'
import { Button, Flex, NavBar, WingBlank, WhiteSpace, List, InputItem,Toast } from 'antd-mobile'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: '',
            pwd: ''
        }
    }
    handlerUser(key, v) {
        this.setState({
            [key]: v
        })
    }
    login = async () => {
        const fromdata = this.state
        const res = await axios.post(`http://127.0.0.1:8086/users/login`,fromdata)
        console.log(res)
        const {data,meta} = res.data
        if(meta.status === 200) {
            const {history} = this.props
            history.push('/')
            localStorage.setItem('token',data.token)
        }else {
            Toast.fail(meta.msg, 1);
        }
    }
    render() {
        return (
            <Flex direction="column" justify="center">
                <Flex.Item>
                    {/* 标题 */}
                        <NavBar mode="dark">登&nbsp;&nbsp;&nbsp;录</NavBar>
                        <WhiteSpace size="xs" />
                </Flex.Item>
                <Flex.Item>
                    {/* 表单 */}
                    <WingBlank size="sm">
                        <WhiteSpace size="xs" />
                        <List>
                            <InputItem value={this.state.uname} onChange={(v) => { this.handlerUser("uname", v) }}>用户名</InputItem>
                            <InputItem value={this.state.pwd} onChange={(v) => { this.handlerUser("pwd", v) }}>密码</InputItem>
                        </List>
                        <WhiteSpace size="xs" />
                    </WingBlank>
                    <WingBlank size="sm">
                        <Button type="primary" onClick={this.login}>登录</Button>
                    </WingBlank>
                </Flex.Item>
            </Flex>
        )
    }
}

export default Login
