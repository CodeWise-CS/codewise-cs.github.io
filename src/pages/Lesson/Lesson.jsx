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
import Accordion from '../../components/Accordion';
import UnautharizedLesson from './UnautharizedLesson';

export default function Lesson({ lesson, handleEnd, languageID }) {
    const { user } = useContext(UserContext);
    const { course } = useParams();
    const queryParameters = new URLSearchParams(
        window.location.hash.split('?')[1]
    );
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
    }, []);

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
                        <div className="accordion-container">
                            <h2 style={{ marginTop: '0px' }}>
                                Practice exercises
                            </h2>
                            <Accordion
                                data={lesson.exercises ? lesson.exercises : []}
                            />
                        </div>
                    </div>
                    <div className="code-container">
                        <IDE languageID={languageID} />
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div className="lesson">
            <UnautharizedLesson
                message="You must complete the previous lessons to view this one"
                course={course}
            />
        </div>
    );
}
