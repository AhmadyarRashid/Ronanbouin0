import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import DragableComponent from './Card/index';

class MainSection extends  React.Component{
    constructor(props){
        super(props)
    }

    render() {
        let {allTodos, todosCount, completedCount, actions}  = this.props;
        return(
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

                <DragableComponent items={allTodos} {...actions} />
            </section>
        )
    }

}
// const MainSection = ({allTodos, todosCount, completedCount, actions }) =>
//     (
//         <section className="main">
//             {
//                 !!todosCount &&
//                 <span>
//           <input
//               className="toggle-all"
//               type="checkbox"
//               checked={completedCount === todosCount}
//               readOnly
//           />
//           <label onClick={actions.completeAllTodos}/>
//         </span>
//             }
//
//             {/*<Debug allTodos={allTodos}/>*/}
//             {/*<VisibleTodoList  />*/}
//             <DragableComponent items={allTodos} {...actions} />
//             {
//                 !!todosCount &&
//                 <Footer
//                     completedCount={completedCount}
//                     activeCount={todosCount - completedCount}
//                     onClearCompleted={actions.clearCompleted}
//                 />
//             }
//         </section>
//     )

MainSection.propTypes = {
    todosCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
}



export default MainSection;
