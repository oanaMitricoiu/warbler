import rootReducer from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

export function configureStore() {
    // const store = createStore(
    //     rootReducer,
    //     compose(
    //         applyMiddleware(thunk),
    //         window.devToolsExtension ? window.devToolsExtension() : (f) => f
    //     )
    // );

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}
