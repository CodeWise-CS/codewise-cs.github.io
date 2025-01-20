import { useState, useEffect, useRef } from 'react';
import './styles/IDE.css';
import {
    Sandpack,
    SandpackFileExplorer,
    useSandpack,
    SandpackProvider,
    SandpackPreview,
    SandpackCodeEditor,
    SandpackLayout,
} from '@codesandbox/sandpack-react';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import TextInput from '../../components/TextInput';

function Editor({ width }) {
    const { sandpack } = useSandpack();
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [removeFileName, setRemoveFileName] = useState(
        // Object.keys(reactFiles)[0]
        ''
    );

    return (
        <>
            {removeModalVisible && (
                <Popup
                    title="Remove file"
                    onConfirm={() => {
                        if (!removeFileName) return;
                        sandpack.deleteFile(removeFileName);
                        setRemoveModalVisible(false);
                    }}
                    onCancel={() => setRemoveModalVisible(false)}
                >
                    <select
                        style={{ margin: '20px 0' }}
                        value={removeFileName}
                        onChange={(e) => setRemoveFileName(e.target.value)}
                    >
                        {Object.keys(sandpack.files).map((file) => (
                            <option value={file}>{file}</option>
                        ))}
                    </select>
                </Popup>
            )}
            {addModalVisible && (
                <Popup
                    title="Add file"
                    onConfirm={() => {
                        newFileName !== '' && sandpack.addFile(newFileName, '');
                        setAddModalVisible(false);
                        setNewFileName('');
                    }}
                    onCancel={() => setAddModalVisible(false)}
                >
                    <p>Examples:</p>
                    <ul>
                        <li>
                            To add a file in the root:
                            <br />
                            "home.html"
                        </li>
                        <li>
                            To add a file in a new or existing folder (named
                            "pages"):
                            <br />
                            "pages/home.html"
                        </li>
                    </ul>
                    <TextInput
                        placeholder="/folderName/fileName"
                        styles={{ marginTop: '20px' }}
                        value={newFileName}
                        onChange={(e) => {
                            let sanitizedValue = e.target.value
                                .replace(/[^\w._/-]/g, '') // Remove invalid characters
                                .replace(/\/+/g, '/') // Replace consecutive slashes with a single slash
                                .replace(/^\/+/, ''); // Remove leading slashes

                            setNewFileName('/' + sanitizedValue);
                        }}
                    />
                </Popup>
            )}
            <SandpackLayout>
                <SandpackFileExplorer
                    style={{
                        height:
                            width > 768
                                ? 'calc((100vh - 149px)/2)'
                                : 'calc((100vh - 149px)/4)',
                    }}
                />
                <SandpackCodeEditor
                    closableTabs={true}
                    showInlineErrors={false}
                    autorun={true}
                    style={{
                        height:
                            width > 768
                                ? 'calc((100vh - 149px)/2)'
                                : 'calc((100vh - 149px)/4)',
                    }}
                    showLineNumbers={true}
                    showRunButton={false}
                />
            </SandpackLayout>
            <SandpackLayout>
                <SandpackPreview
                    showNavigator
                    style={{
                        height:
                            width > 768
                                ? 'calc((100vh - 149px)/2)'
                                : 'calc((100vh - 149px)/4)',
                    }}
                    showOpenInCodeSandbox={false}
                    actionsChildren={
                        <>
                            <Button
                                onClick={() => setRemoveModalVisible(true)}
                                styles={{
                                    padding: '12px',
                                    fontSize: '14px',
                                    color: 'var(--secondary-color)',
                                    borderColor: 'var(--secondary-color)',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    marginRight: '10px',
                                }}
                                text="Remove file"
                                type="transparent"
                            />
                            <Button
                                styles={{
                                    width: 'fit-content',
                                    padding: '12px',
                                    fontSize: '14px',
                                }}
                                text="+ Add files"
                                type="accent"
                                onClick={() => setAddModalVisible(true)}
                            />
                        </>
                    }
                ></SandpackPreview>
            </SandpackLayout>
        </>
    );
}

export default function IDE({ languageID }) {
    const [width, setWidth] = useState(window.innerWidth);

    const templates = {
        react: 'react',
        'html-css': 'static',
    };

    let sandpackElement = (
        <SandpackProvider template={templates[languageID]}>
            <Editor width={width} />
        </SandpackProvider>
    );

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));

        return () =>
            window.removeEventListener('resize', () =>
                setWidth(window.innerWidth)
            );
    }, []);

    return languageID === 'html/css' || languageID === 'react' ? (
        <div>{sandpackElement}</div>
    ) : (
        <div className="ide-container">
            {' '}
            <iframe
                src={`https://www.jdoodle.com/embed/v1/${languageID}`}
                className="ide"
                width="100%"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}
