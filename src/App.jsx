import {memo, lazy} from 'react';

const Content = lazy(() => import('./Content.jsx'));

function App() {
    return (
        <>
            <h2>And here goes the content:</h2>
            <Content/>
        </>
    );
}

export default memo(App);