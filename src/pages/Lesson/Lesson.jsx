import { useState, useEffect, useContext } from 'react';
import './styles/Lesson.css';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../../context/CourseContext';
import { UserContext } from '../../context/UserContext';
import TopNavbar from '../../components/TopNavbar';
import Button from '../../components/Button';
import Video from '../../components/Video';
import VideoCard from './VideoCard';
import SelectVideo from './SelectVideo';
import Editor, { loader } from '@monaco-editor/react';

export default function Lesson({ lesson, handleEnd }) {
    const { courses } = useContext(CourseContext);
    const { user } = useContext(UserContext);
    const { course } = useParams();
    const queryParameters = new URLSearchParams(window.location.search);
    const lessonNumber = queryParameters.get('lesson');
    // const [lesson, setLesson] = useState(null);
    // const [videoId, setVideoId] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState({});
    const [videoCards, setVideoCards] = useState(null);
    const [selectingVideo, setSelectingVideo] = useState(true);
    const [hasPermission, setHasPermission] = useState(true);
    const [editorOptions, setEditorOptions] = useState(null);

    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.editor.defineTheme('myTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#0a253a',
                },
            });
        });
        setEditorOptions({
            fontSize: 18,
            theme: 'myTheme',
        });
    }, []);

    console.log('Lesson: ', lesson);

    function selectVideo(newVideo) {
        console.log('Selected ', newVideo);
        // setVideoId(newVideoId);
        setSelectedVideo(newVideo);
        setSelectingVideo(false);
    }

    useEffect(() => {
        console.log('User: ', user);
        if (user) {
            // if (!user.coursesInProgress) {
            //   setHasPermission(false)
            //   Add new course to user data with current lesson equal to 0
            // }
            if (user.coursesInProgress[course].currentLesson < lessonNumber) {
                setHasPermission(false);
            }
        }
    }, [user]);

    useEffect(() => {
        setSelectedVideo(lesson.videos[0]);
        setVideoCards(
            lesson.videos.map((video, index) => {
                return (
                    <VideoCard
                        onSelected={(newVideoId) => {
                            selectVideo(newVideoId);
                        }}
                        // id={video.id}
                        video={video}
                        key={index}
                        recommended={!index}
                        title={video.name}
                        channel={video.channel}
                        length={video.length}
                    />
                );
            })
        );
    }, [courses]);

    return hasPermission ? (
        <div className="lesson">
            <TopNavbar />
            <div className="lesson-info">
                {selectingVideo && <SelectVideo>{videoCards}</SelectVideo>}
                <h1 className="secondary-text title">
                    {lesson ? lesson.lessonName : 'Loading...'}
                </h1>
                {!selectingVideo && (
                    <div>
                        <Button
                            onClick={handleEnd}
                            styles={{
                                top: 'auto',
                                padding: '12px',
                                marginRight: '8px',
                                fontSize: '14px',
                                color: 'var(--secondary-color)',
                                borderColor: 'var(--secondary-color)',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                            }}
                            text="Next lesson"
                            type="transparent"
                        />
                        <Button
                            onClick={() => setSelectingVideo(true)}
                            styles={{
                                top: 'auto',
                                padding: '12px',
                                fontSize: '14px',
                            }}
                            text="Change video"
                            type="accent"
                        />
                    </div>
                )}
            </div>
            {lesson && (
                <div className="main-container">
                    <div className="content-container">
                        {selectedVideo && (
                            <Video
                                embedId={selectedVideo.id}
                                start={selectedVideo.startSeconds}
                                end={selectedVideo.endSeconds}
                            />
                        )}
                        <h3 className="white-text section-header">Console</h3>
                    </div>
                    <div className="code-container">
                        <h3 className="white-text section-header">Code</h3>
                        {editorOptions && selectedVideo && (
                            <Editor
                                theme="vs-dark"
                                height={'88%'}
                                language="javascript"
                                // options={editorOptions}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div className="lesson">
            <p>You must complete the previous lessons to view this one</p>
        </div>
    );
}
