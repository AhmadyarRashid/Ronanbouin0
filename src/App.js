import React, {Component} from 'react';
import {Tabs} from 'antd';
import MainComponent from './components/MainComponent';
import {connect} from 'react-redux';
import {localToRedux} from './actions/index';

const {TabPane} = Tabs;

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let storedTodos = localStorage.getItem("TodoList");
        if (storedTodos) {
            storedTodos = JSON.parse(storedTodos);
            this.props.dispatch(localToRedux(storedTodos));
        }
    }

    callback = (key) => {
        console.log(key);
    };

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Tab 1" key="1">
                    <MainComponent/>
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                    {/*<Dragable items={'ipsum Lorem sit dolor'.split(' ')}/>*/}
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        )
    }
}

const mapStatToProps = state => ({
    todos: state.todos
});
export default connect(mapStatToProps)(App);
