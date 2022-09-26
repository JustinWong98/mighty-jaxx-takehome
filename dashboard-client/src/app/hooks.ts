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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
