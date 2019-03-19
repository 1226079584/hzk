import React from 'react';
import axios from '../../http'
import './index.css'
import { SearchBar, Carousel, Grid, NoticeBar, Card, Badge, WhiteSpace, WingBlank } from 'antd-mobile'
// const gdata = Array.from(new Array(8)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//     text: `name${i}`,
//   }));
const thumbStyle = {
    width: "125px",
    height: "95px"
}
class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            CarouselData: [],
            imgHeight: 176,
            gridData: [],
            newsdata: [],
            hotData: [],
            newHouse: [],
            newHouseList: []
        }
    }
    axiosRes = async (path) => {
        const res = await axios.post(`${path}`)
        const { data, meta } = res.data
        if (meta.status === 200) {
            return data.list
        }
    }
    async componentDidMount() {
        let carousel = this.axiosRes(`homes/swipe`)
        let GridMenu = this.axiosRes(`homes/menu`)
        let news = this.axiosRes(`homes/info`)
        let hotData = this.axiosRes(`homes/faq`)
        let newhouse = this.axiosRes(`homes/house`)
        const res = await Promise.all([carousel, GridMenu, news, hotData, newhouse])
        // console.log(res)
        this.setState({
            CarouselData: res[0],
            gridData: res[1],
            newsdata: res[2],
            hotData: res[3],
            newHouse: res[4]
        }, () => {
            let data = this.state.gridData.map((item, i) => {
                return {
                    icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
                    text: item.menu_name,
                    id: i + 1
                }
            })
            let changeNewH = this.state.newHouse
            let newh = this.newList(changeNewH, 2, 2, 3)
            // console.log(newh);

            this.setState({
                gridData: data,
                newHouseList: newh
            })
        })


    }
    newList = (arr, ...num) => {
        let resArr = []
        for (let i = 0; i < num.length; i++) {
            resArr.push(arr.splice(0, num[i]))
        }
        return resArr
    }
    hlist = (el) => {
        console.log(el);
        const { text,id } = el
        const { history } = this.props.promise
        // console.log(history)
        history.push('/houseList', { query: { promise: {id:id, title: text } } })
    }
    render() {
        const newsData = this.state.newsdata.map((item, i) => {
            return <NoticeBar key={i} mode="link" action={<span>去看看</span>} marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                {item.info_title}
            </NoticeBar>
        })
        const hotList = this.state.hotData.map((item, i) => {
            return <Card full="true" key={i}>
                <Card.Header
                    title={<span><Badge text="HOT" hot /><br />
                        {item.question_name}
                    </span>}
                    extra={<span><Badge text={item.answer_content} /><br /><Badge text={item.question_tag} /></span>}
                />
            </Card>
        })
        const HouseList = this.state.newHouseList.map((item, i) => {
            const child = item.map((item, i) => {
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
            return <div key={i}>
                <WhiteSpace size="lg" />
                <WingBlank size="md"><span className="hkwd2">{i === 0 ? "最新开盘" : i === 1 ? "二手精选" : "组一个家"}</span></WingBlank>
                <WhiteSpace size="lg" />
                {child}
            </div>
        })
        return (
            <div>
                {/* 搜索框 */}
                <SearchBar placeholder="搜房源..." />
                {/* 轮播图 */}
                <Carousel
                    autoplay={false}
                    infinite
                >
                    {this.state.CarouselData.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`${val.original}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                {/* menu */}
                <Grid data={this.state.gridData} activeStyle={false} onClick={(el) => { this.hlist(el) }} />
                {/* 好客资讯 */}
                {newsData}
                {/* 好客问答 */}
                <WhiteSpace size="lg" />
                <WingBlank size="md"><span className="hkwd">好客问答</span></WingBlank>
                <WhiteSpace size="lg" />
                {hotList}
                {HouseList}
            </div>
        )
    }
}

export default Index
