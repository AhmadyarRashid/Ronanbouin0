import React , {Component} from 'react';
import {connect} from 'react-redux';
import AddComment from './AddComment';
import {changeStatus} from '../../actions/index';
import './styles.css';

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            is_editing : false,
            is_checked : false
        }
    }

    componentDidMount() {
        let is_checked = this.props.item.status;
        this.setState({
            is_checked
        })
    }

    handlerComment= (text, id) => {
        this.setState(preState => ({
            is_editing: !preState.is_editing
        }))
    };

    handlerCB = (e, id) => {
        console.log('======== input status' , e.target.checked , id);
        let status = e.target.checked;
        this.setState({
            is_checked : status
        })
        this.props.dispatch(changeStatus({id,status}))
    };

    handlerEditing = () => {
      this.setState({
          is_editing: false
      })
    };

    render(){
        let {item} = this.props;
        return(
            <div className={"container card-main"}>
                <div>
                    {item.text}
                </div>
                <div className="card-comments" onDoubleClick={e => item.status ? '' : this.handlerComment(item.text , item.id)}>
                    {this.state.is_editing ? <AddComment id={item.id} editing={this.handlerEditing} /> :
                        <ul>
                            {item.comments.length == 0 ?
                                <li>Add Comment</li>:
                                item.comments.map((i,index) => (
                                    <li key={index}>{i}</li>
                                ))
                            }
                        </ul>
                    }

                </div>
                <div
                    className="card-action">

                    <input id="chkPrimary" checked={this.state.is_checked} style={{width: 50, height: 50, marginTop: 15}} onChange={e => this.handlerCB(e, item.id)} type="checkbox"/>

                </div>
            </div>

        )
    }
}

const mapStatToProps = state => ({
    todos : state.todos
});
export default connect(mapStatToProps)(TodoItem);
