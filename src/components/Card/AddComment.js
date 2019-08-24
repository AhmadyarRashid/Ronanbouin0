import React , {Component} from 'react';
import {connect} from 'react-redux';
import {addComment} from '../../actions/index';

class AddComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment : ''
        }
    }

    changeComment(e){
        const comment = e.target.value;
        this.setState({
            comment
        })
    }

    handlerComment(e){
        if(e.keyCode == 13){
            const id = this.props.id;
            const comment = this.state.comment;
            if(comment.trim() !== ""){
                this.props.dispatch(addComment({
                    id,
                    comment
                }));
            }
            this.props.editing();
        }
    }

    render(){
        return(
            <input type="text" value={this.state.comment} style={{color: 'black' , margin : 10, padding:5}} onChange={e => this.changeComment(e)} onKeyUp={e => this.handlerComment(e)} />
        )
    }
}

const mapStatToProps = state => ({
   todos : state.todos
});

export default connect(mapStatToProps)(AddComment);
