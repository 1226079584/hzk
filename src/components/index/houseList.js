import React from 'react';
import axios from '../../http'
import { NavBar, Icon, Card, Badge } from 'antd-mobile'
const thumbStyle = {
    width: "125px",
    height: "95px"
}
class HouseList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            list: []
        }
    }
    async componentDidMount() {
        const { title } = this.props.location.state.query.promise
        const home_type = this.props.location.state.query.promise.id
        switch (home_type) {
            case 1:
            case 2:
            case 3:
            case 4:
                const res = await axios.post(`homes/list`, { home_type })
                console.log(res)
                const { data, meta } = res.data
                this.setState({
                    list: data
                })
                break;
            case 5:
            console.log(5)
            break;

        }
        // const res = await axios.post(`homes/list`, { home_type })
        // console.log(res)
        // const { data, meta } = res.data
        this.setState({
            text: title
        })
    }
    goback = () => {
        const { history } = this.props
        // console.log(history)
        history.goBack()
    }
    render() {
        const houseList = this.state.list.map((item, i) => {
            return <Card full="true" key={i}>
                <Card.Header
                    // title={<img src='http://127.0.0.1:8086/public/home.png' />}
                    thumb="http://127.0.0.1:8086/public/home.png"
                    thumbStyle={thumbStyle}
                    extra={<span>
                        <Badge text={item.home_name}
                            style={{
                                marginLeft: 12,
                                padding: '0 3px',
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                color: '#f19736',
                                border: '1px solid #f19736',
                            }}
                        />
                        <Badge text={item.home_desc}
                            style={{
                                marginLeft: 12,
                                padding: '0 3px',
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                color: '#f19736',
                                border: '1px solid #f19736',
                            }}
                        />
                        <Badge text={item.home_tags}
                            style={{
                                marginLeft: 12,
                                padding: '0 3px',
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                color: '#f19736',
                                border: '1px solid #f19736',
                            }}
                        />
                        <br />
                        <Badge text={'￥' + item.home_price}
                            style={{
                                marginLeft: 12,
                                padding: '0 10px',
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                color: '#000',
                            }}
                        />
                    </span>}
                />
            </Card>
        })
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.goback}
                >{this.state.text}</NavBar>
                {houseList}
            </div>
        )
    }
}

export default HouseList
