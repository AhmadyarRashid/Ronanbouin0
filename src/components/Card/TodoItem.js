import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddComment from './AddComment';
import {changeStatus , deleteTodo} from '../../actions/index';
import './styles.css';
import { Menu, Dropdown, Icon } from "antd";

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_editing: false,
            is_checked: false
        }
    }

    componentDidMount() {
        let is_checked = this.props.item.status;
        this.setState({
            is_checked
        })
    }

    handlerComment = (text, id) => {
        this.setState(preState => ({
            is_editing: !preState.is_editing
        }))
    };

    handlerDelete = (id) => {
        this.props.dispatch(deleteTodo(id));
    };

    handlerCB = (e, id) => {
        let status = e.target.checked;
        this.setState({
            is_checked: status
        });
        this.props.dispatch(changeStatus({id, status}));
        this.props.refreshComponent();
    };

    handlerEditing = () => {
        this.setState({
            is_editing: false
        })
    };

    render() {
        let {item} = this.props;
        return (
            <div className="card-main">
                <div className="card-title" style={{marginTop: 35 }}>
                   {item.text}
                </div>
                <div className="card-comments"
                     onDoubleClick={e => item.status ? '' : this.handlerComment(item.text, item.id)}>
                    {this.state.is_editing ? <AddComment id={item.id} editing={this.handlerEditing}/> : ''}
                    <ul>
                        {item.comments.length == 0 ?
                            <li>Add Comment</li> :
                            item.comments.map((i, index) => {

                                if(index < 7 && !this.state.is_editing) {
                                    return (
                                        <li key={index}>{i}</li>
                                    );
                                }

                                if(index < 2 && this.state.is_editing) {
                                    return (
                                        <li key={index}>{i}</li>
                                    );
                                }
                            })
                        }
                    </ul>

                </div>
                <div
                    className="card-action">
                    <input id="chkPrimary" checked={this.state.is_checked}
                           style={{width: 25, height: 25, marginTop: 15}} onChange={e => this.handlerCB(e, item.id)}
                           type="checkbox"/> {'\n'}

                    <Dropdown style={{marginLeft: 15}} overlay={
                        <Menu>
                            <Menu.Item>
                                <a target="_blank" onClick={e => this.handlerDelete(item.id)}>Delete</a>
                            </Menu.Item>
                        </Menu>
                    }>
                        <a>
                            <Icon type="ellipsis" size="large" />
                        </a>
                    </Dropdown>
                </div>
            </div>

        )
    }
}

const mapStatToProps = state => ({
    todos: state.todos
});
export default connect(mapStatToProps)(TodoItem);
