import React, {useRef} from 'react';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import {useGesture} from 'react-use-gesture';
import {useSprings, animated, interpolate} from 'react-spring';
import TodoItem from './TodoItem';
import {connect} from 'react-redux';
import {updateOrder} from '../../actions/index';
import './styles.css';
import {Button} from "antd";

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => index =>
    down && index === originalIndex
        ? {y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex'}
        : {y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false};

const handlerSaveOrder = () => {

};

function DraggableList(props) {
    let {items} = props;
    let order = items.map((_, index) => index); // Store indicies as a local ref, this represents the item order
    // console.log('items =========', items);
    console.log('===== order ==', order);
    const [springs, setSprings] = useSprings(items.length, fn(order)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
    const bind = useGesture(({args: [originalIndex], down, delta: [, y]}) => {
        const curIndex = order.indexOf(originalIndex);
        const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
        const newOrder = swap(order, curIndex, curRow);
        console.log('NO', newOrder);
        // console.log('UI' , items )
        // props.dispatch(updateOrder(items));


        setSprings(fn(newOrder, down, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render
        if (!down) order = newOrder

        let temp = items;
        // rearrange redux
        temp.forEach((item, index) => {
            // find new index of object
            let newInd = order.indexOf(item.id);
            item.id = newInd;

            if (temp.length == index + 1) {
                temp.sort(function (a, b) {
                    return a.id - b.id
                });
                console.log('NO', '===', temp);
                localStorage.setItem("TodoList", JSON.stringify(temp));
            }

        });
    });
    return (
        <div className="content" style={{height: items.length * 150}}>
            {springs.map(({zIndex, shadow, y, scale}, i) => (
                <animated.div
                    {...bind(i)}
                    key={i}
                    style={{
                        zIndex,
                        boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                        transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`),
                        width: 500
                    }}
                    children={items[i].text}
                >
                    <div className="view">
                        <TodoItem item={items[i]}/>
                    </div>
                </animated.div>
            ))}
        </div>
    )
}

const mapStatToProps = state => ({
    todos: state.todos
});

export default connect(mapStatToProps)(DraggableList);
