import React, { Component } from 'react';
import './LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            loginmsg : ''
        };
      }
    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
        // console.log(this.state.username);
    }

    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }

    onSubmit(){
        // this.setState({
        //     loginmsg: this.state.username
        // });
        this.onInvokeRest();
    }

    onInvokeRest(){
        const url = "https://ft90bpsivk.execute-api.ap-northeast-1.amazonaws.com/dev/getuser";
        let data = JSON.stringify({
            UserName: this.state.username,
            Password: this.state.password
        })
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                // 'Accept': 'application/json'
            },
            body: data
            
        }).then(response => response.json())
            .then(result => {
               console.log(result);
                if(result['Count']>0){
                    console.log('Found User!!');
                    this.setState({
                        // loginmsg: result['Items']
                        loginmsg: '欢迎 '+this.state.username
                    });
                }else{
                    this.setState({
                        // loginmsg: result['Items']
                        loginmsg: '用户名/密码错误'
                    });
                }
                // if(result.hasOwnProperty("Items")){
                //     console.log('Found items!!');
                // }

            }).catch(function (e) {
                //console.log("fetch fail", JSON.stringify(params));
            });
    }

    render() {
        return (
            <div className="login-form">
                <div className="login-panel">
                    <div className="panel-heading"></div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="请输入用户名"
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)} />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)} />
                            </div>
                            <button className="btn"
                                onClick={e => { this.onSubmit(e) }}>登录</button>
                        </div>
                        <br></br>
                        <label className="welcome-msg">{this.state.loginmsg}</label>
                        {/* <label className="welcome-msg">welcome!!!</label> */}
                    </div>
                </div>

            </div>
            
        );
    }
}

export default LoginPage;
