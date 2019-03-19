import React from 'react';
import { NavBar, Tabs } from 'antd-mobile'
const tabs = [
    { title: '咨询' },
    { title: '头条' },
    { title: '问答' },
];
const ge = document.documentElement.clientHeight-139
const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: ge,
    backgroundColor: '#fff'
}
class News extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        console.log(ge)
        return (
            <div>
                <NavBar mode="dark">咨询</NavBar>
                <Tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false}>
                    <div style={style}>
                        Content of first tab
                    </div>
                    <div style={style}>
                        Content of second tab
                    </div>
                    <div style={style}>
                        Content of third tab
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default News
