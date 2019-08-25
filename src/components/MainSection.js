import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import DragableComponent from './Card/index';
import {connect} from 'react-redux';
import {getCompletedTodoCount} from "../selectors";

class MainSection extends React.Component {
    constructor(props) {
        super(props)
    }

    // refresh component
    refreshComponent(){
        //this.forceUpdate();
    }

    render() {
        let {allTodos, todosCount, completedCount, actions , filter} = this.props;
        console.log('============= change redux filter =====' , filter);

        let items = [];
        if(filter == "all"){
            items = allTodos;
        }else if(filter == "active"){
           allTodos.forEach(item => {
                if(!item.status){
                    items.push(item);
                }
            })
        }else if(filter == "inactive"){
             allTodos.forEach(item => {
                if(item.status){
                    items.push(item);
                }
            })
        }

        return (
            <section className="main">
                {
                    !!todosCount &&
                    <span>
          <input
              className="toggle-all"
              type="checkbox"
              checked={completedCount === todosCount}
              readOnly
          />
          <label onClick={actions.completeAllTodos}/>
        </span>
                }
                {
                    !!todosCount &&
                    <Footer
                        completedCount={completedCount}
                        activeCount={todosCount - completedCount}
                        onClearCompleted={actions.clearCompleted}
                    />
                }
                {items.length > 0 &&   <DragableComponent items={items} {...actions} refreshComponent={this.refreshComponent}/> }

            </section>
        )
    }

}

MainSection.propTypes = {
    todosCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStatToProps = state => ({
    allTodos : state.todos
});

export default connect(mapStatToProps)(MainSection);
