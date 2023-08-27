import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
//https://www.youtube.com/watch?v=uRlh6-tHWEE
//
//если мы не хотим прописывать типизацию то используем данный способ (это хуки из react-redux) делаем свои кастомные хукки
//кастомные хукки
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;