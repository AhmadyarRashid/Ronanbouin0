import React , {Component} from 'react';
import { Tabs } from 'antd';
import MainComponent from './components/MainComponent';
import Dragable from './components/Card/index';
import 'antd/dist/antd.css';
import 'todomvc-app-css/index.css';

const { TabPane } = Tabs;

class App extends Component{
  constructor(props){
    super(props);
  }

  callback = (key) => {
    console.log(key);
  };

  render() {
    return(
        <div className="App">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">
              <MainComponent/>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <Dragable items={'ipsum Lorem sit dolor'.split(' ')}/>
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>,
        </div>
    )
  }
}

export default App;
