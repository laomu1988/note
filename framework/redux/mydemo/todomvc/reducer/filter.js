import types from '../const/constant.js'

export default function (state, action) {
    if (typeof state === 'undefined') {
        return types.Show_All;
    }
    switch (action.type) {
        case types.Show_All:
        case types.Show_Active:
        case types.Show_Complete:
            return action.type;
        default:
            return state;
    }
}
