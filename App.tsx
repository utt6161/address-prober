import * as React from 'react';
import Index from "./src/Index"
import store from './src/store/store';
import { Provider } from 'react-redux'

export default function App() {
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    );
}