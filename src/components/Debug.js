import React, {Component} from 'react';


class Debug extends Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log('======= all Todos' , this.props.allTodos);
        return(
          <div>
              Hello World
          </div>
        );
    }
}

export default Debug;
