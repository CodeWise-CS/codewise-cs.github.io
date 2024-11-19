import { useState, useEffect, useContext } from 'react';
import { setUserData } from '../../firebase';
import './styles/Lesson.css';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../../context/CourseContext';
import { UserContext } from '../../context/UserContext';
import TopNavbar from '../../components/TopNavbar';
import Button from '../../components/Button';
import Video from '../../components/Video';
import VideoCard from './VideoCard';
import SelectVideo from './SelectVideo';
import IDE from './IDE';

export default function Lesson({ lesson, handleEnd }) {
    const { courses } = useContext(CourseContext);
    const { user } = useContext(UserContext);
    const { course } = useParams();
    const queryParameters = new URLSearchParams(window.location.search);
    const lessonNumber = queryParameters.get('lesson');
    const [selectedVideo, setSelectedVideo] = useState({});
    const [videoCards, setVideoCards] = useState(null);
    const [selectingVideo, setSelectingVideo] = useState(true);
    const [hasPermission, setHasPermission] = useState(true);

    function selectVideo(newVideo) {
        setSelectedVideo(newVideo);
        setSelectingVideo(false);
    }

    useEffect(() => {
        // Stop from resetting coursesInProgress/{courseName} after user changes when last lesson is completed
        if (user && !user.completedCourses?.includes(course)) {
            if (!user.coursesInProgress) {
                setUserData([course], 'coursesInProgress/courseNames');
                setUserData(
                    {
                        currentLesson: 0,
                        questionsAnswered: 0,
                        correctAnswers: 0,
                    },
                    `coursesInProgress/${course}`
                );
            } else if (!user.coursesInProgress.courseNames.includes(course)) {
                setUserData(
                    [...user.coursesInProgress.courseNames, course],
                    'coursesInProgress/courseNames'
                );
                setUserData(
                    {
                        currentLesson: 0,
                        questionsAnswered: 0,
                        correctAnswers: 0,
                    },
                    `coursesInProgress/${course}`
                );
            } else if (
                user.coursesInProgress[course].currentLesson < lessonNumber
            ) {
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
                        {!selectingVideo && (
                            <div>
                                <Button
                                    onClick={handleEnd}
                                    styles={{
                                        top: 'auto',
                                        padding: '12px',
                                        fontSize: '14px',
                                        width: 'fit-content',
                                        marginTop: '18px',
                                        marginRight: '8px',
                                    }}
                                    text="Next lesson"
                                    type="accent"
                                />
                                <Button
                                    onClick={() => setSelectingVideo(true)}
                                    styles={{
                                        top: 'auto',
                                        padding: '12px',
                                        fontSize: '14px',
                                        color: 'var(--secondary-color)',
                                        borderColor: 'var(--secondary-color)',
                                        borderWidth: '2px',
                                        borderStyle: 'solid',
                                    }}
                                    text="Change video"
                                    type="transparent"
                                />
                            </div>
                        )}
                    </div>
                    <div className="code-container">
                        {/* <h3 className="white-text section-header">Code</h3> */}
                        <IDE languageID={courses.courses.languageIds[course]} />
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
