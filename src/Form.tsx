import { useReducer } from 'react';
import Input from './Input';

type State = {
    name: string;
    email: string;
};

// type Action = {
//     type: 'setName' | 'setEmail';
//     payload: string;
// };

type Action =
    | { type: 'setName'; payload: string }
    | { type: 'setEmail'; payload: string };

// function reducer(state: State, action: Action) {
//     if (action.type === 'setName') {
//         return { ...state, name: action.payload };
//     }
//     if (action.type === 'setEmail') {
//         return { ...state, email: action.payload };
//     }
//     return state;
// }

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'setName':
            return { ...state, name: action.payload };

        case 'setEmail':
            return { ...state, email: action.payload };

        default:
            return state;
    }
}

const Form = () => {
    const [state, dispatch] = useReducer(reducer, { name: '', email: '' });

    return (
        <div>
            <Input
                label={`Nome: ${state.name}`}
                id="name"
                value={state.name}
                onChange={({ target }) =>
                    dispatch({
                        type: 'setName',
                        payload: target.value
                    })
                }
            />
            <Input
                label={`Email: ${state.email}`}
                id="email"
                value={state.email}
                onChange={({ target }) =>
                    dispatch({
                        type: 'setEmail',
                        payload: target.value
                    })
                }
            />
        </div>
    );
};

export default Form;
