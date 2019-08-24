import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import DragableComponent from './Card/index';

class MainSection extends React.Component {
    constructor(props) {
        super(props)
    }

    // refresh component
    refreshComponent(){
        //this.forceUpdate();
    }

    render() {
        let {allTodos, todosCount, completedCount, actions} = this.props;
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

                {/*<Debug allTodos={allTodos}/>*/}
                {/*<VisibleTodoList  />*/}

                {
                    !!todosCount &&
                    <Footer
                        completedCount={completedCount}
                        activeCount={todosCount - completedCount}
                        onClearCompleted={actions.clearCompleted}
                    />
                }

                <DragableComponent items={allTodos} {...actions} refreshComponent={this.refreshComponent}/>
            </section>
        )
    }

}

MainSection.propTypes = {
    todosCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
};

export default MainSection;
