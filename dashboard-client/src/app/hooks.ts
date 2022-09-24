import { useState, SyntheticEvent, createContext, useContext } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useForm = (callback: Function, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event: SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        setValues({ ...values, [target.name]: target.value });
    };

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values
    };
};

// const authContext = createContext(undefined);

// function useAuth() {
//     const [authed, setAuthed] = useState(false);

//     return {
//         authed,
//         login() {
//             return new Promise<void>((res) => {
//                 setAuthed(true);
//                 res();
//             });
//         },
//         logout() {
//             return new Promise<void>((res) => {
//                 setAuthed(false);
//                 res();
//             });
//         }
//     };
// }

// export function AuthProvider({ children }: { children: JSX.Element }) {
//     const auth = useAuth();

//     return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export function AuthConsumer() {
//     return useContext(authContext);
// }

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
