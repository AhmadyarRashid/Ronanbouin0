import { SHOW_ALL, SHOW_ACTIVE ,SHOW_COMPLETED } from '../constants/TodoFilters';


const visibilityFilter = (state = 'all', action) => {
    switch (action.type) {
        case "ALL":
            return 'all';
        case "ACTIVE":
            return 'active';
        case  "INACTIVE":
            return 'inactive';
        default:
            return state
    }
};

export default visibilityFilter;
