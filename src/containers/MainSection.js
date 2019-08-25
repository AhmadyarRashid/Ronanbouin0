import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { bindActionCreators } from 'redux'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors';
import visibilityFilter from "../reducers/visibilityFilter";

const mapStateToProps = state => ({
    allTodos : state.todos,
    todosCount: state.todos.length,
    completedCount: getCompletedTodoCount(state),
    filter : state.visibilityFilter
});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainSection)

