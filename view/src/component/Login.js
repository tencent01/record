import React, {Component} from 'react';

class Login extends Component {


    constructor(props) {
        super(props);
        const screenWidth=window.innerWidth;
        this.state={
            translateX: screenWidth/2-160,
            translateY: 150,
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
        window.ontouchend = e => this.onMouseUp(e);
        window.ontouchmove = e => this.onTouchMove(e);
        this.onHandleClick=this.onHandleClick.bind(this);
        this.onHandleShowCreateAccount=this.onHandleShowCreateAccount.bind(this);
        this.onSubmittClick=this.onSubmittClick.bind(this);
    }


    onMouseDown(e) {
        e.stopPropagation();
        this.moving = true;
    }

    onMouseUp() {
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
    }

    onMouseMove(e) {
        this.moving && this.onMove(e);
    }

    onTouchMove(e) {
        this.moving && this.onTouchesMove(e);
    }

    onTouchesMove(e) {
        let touch=e.touches[0];
        if(this.lastX && this.lastY) {
            let dx = touch.pageX - this.lastX;
            let dy = touch.pageY - this.lastY;
            this.setState({ translateX: this.state.translateX + dx, translateY: this.state.translateY + dy })
        }
        this.lastX = touch.pageX;
        this.lastY = touch.pageY;
    }

    onMove(e) {
        if(this.lastX && this.lastY) {
            let dx = e.clientX - this.lastX;
            let dy = e.clientY - this.lastY;
            this.setState({ translateX: this.state.translateX + dx, translateY: this.state.translateY + dy })
        }
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }
    onMouseOut(e){
        this.setState({
            cursorStyle:false
        });
    }

    onMouseOver(e){
        this.setState({
            cursorStyle:true
        });
    }

    onHandleClick(){
        this.props.showLogin(true);
    }

    onHandleShowCreateAccount(){
        this.props.showCreateAccount(true,true);
    }

    onSubmittClick(){

    }


    render() {
        const cursorStyle = {
            cursor:this.state.cursorStyle ? 'pointer' : 'default'
        };

        return (
            <div style={{width:'1px',height:'0px'} }>
                <div
                    style={{transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)`}}
                >
                    <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: '32000%', height: 380, backgroundColor: 'white',left:'50%'}}>
                        <div
                            onMouseDown={e => this.onMouseDown(e)}
                            onTouchStart={e => this.onMouseDown(e)}
                            onMouseOut={e=>this.onMouseOut(e)}
                            onMouseOver={e=>this.onMouseOver(e)}
                            style={{cursor:cursorStyle.cursor, width: '100%', height: 20, backgroundColor: 'white' }}
                        >
                            <button onClick={this.onHandleClick} type="button" className="close" aria-label="关闭">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div style={{float:'left'}}>
                            <form>
                                <div className="form-group">
                                    <label className="float-left" htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                    <small id="emailHelp" className="float-left form-text text-muted mt-1">We'll never share your email with
                                        anyone else.
                                    </small>
                                </div>
                                <div className="form-group pt-3">
                                    <label className="float-left" htmlFor="exampleInputPassword1">Password</label>
                                    <button type="button"  className="float-right btn btn-link pt-0 font-weight-normal">Forgot password?</button>
                                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="form-group">
                                    <div className="float-left form-check">
                                        <input  type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Stay signed in</label>
                                    </div>
                                    {/*<button type="button" className="float-left btn btn-link pt-0 font-weight-normal">Create an account</button>*/}
                                </div>
                                <div className="form-group">
                                    <button onClick={this.onSubmittClick} style={{width:'100%'}} type="submit" className="btn btn-primary mt-3">登录</button>
                                </div>

                                <div className="form-group">
                                    <button onClick={this.onHandleShowCreateAccount} style={{width:'100%'}} type="button" className="btn btn-outline-primary">Create an account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
