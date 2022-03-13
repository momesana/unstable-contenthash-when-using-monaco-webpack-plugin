import {memo, useRef, useEffect, useState} from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

function App() {
    const editorElRef = useRef(null);
    const [editor, setEditor] = useState(null);


    useEffect(() => {
        if (editorElRef.current && !editor) {
            const monacoEditor = monaco.editor.create(editorElRef.current, {
                value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
                language: 'javascript'
            });
            monacoEditor.layout({ height: 400, width: 1000 });
            setEditor(monacoEditor);
        }


    }, [editorElRef.current]);

    return (
        <>
            <h1>Editor: </h1>
            <div style={{height: '100%'}} ref={editorElRef}/>
        </>
    );
}

export default memo(App);