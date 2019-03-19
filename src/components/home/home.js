import React from 'react';
import Index from '../index/index'
import Main from '../main/main'
import Mine from '..//mine/mine'
import News from '../news/news'
import { TabBar } from 'antd-mobile'
import tabdata from './tabbardata'
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'index',
            hidden: false,
            fullScreen: true
        }
    }
    renderContent = () => {
        const tabs = this.state.selectedTab
        switch (tabs) {
            case 'index':
                return <Index promise={this.props}></Index>
                break;
            case 'main':
                return <Main></Main>
                break;
            case 'mine':
                return <Mine></Mine>
                break;
            case 'news':
                return <News></News>
                break;

            default:
                break;
        }

    }
    render() {
        const TabBar_Item = tabdata.map((item, i) => {
            return <TabBar.Item
                title={item.title}
                key={item.key}
                icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `${item.icon_url}`
                }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `${item.selectedIcon_url}`
                }}
                />
                }
                selected={this.state.selectedTab === `${item.selectedTab}`}
                onPress={() => {
                    this.setState({
                        selectedTab: `${item.selectedTab}`,
                    });
                }}
                data-seed="logId"
            >
                {this.renderContent()}
            </TabBar.Item>
        })
        return (
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    tabBarPosition="bottom"
                >
                {TabBar_Item}
                </TabBar>
            </div>
        )
    }
}

export default Home
