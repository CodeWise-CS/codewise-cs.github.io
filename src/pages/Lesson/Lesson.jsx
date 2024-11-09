import React from "react";
import "./styles/Lesson.css";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";
import { UserContext } from "../../context/UserContext";
import TopNavbar from "../../components/TopNavbar";
import Button from "../../components/Button";
import Video from "../../components/Video";
import VideoCard from "./VideoCard";
import SelectVideo from "./SelectVideo";
import DOMPurify from "dompurify";
import Editor, { loader } from "@monaco-editor/react";

function Lesson(props) {
  const { courses } = React.useContext(CourseContext);
  const { user } = React.useContext(UserContext);
  const { course } = useParams();
  const queryParameters = new URLSearchParams(window.location.search);
  const lessonNumber = queryParameters.get("lesson");
  // const [lesson, setLesson] = React.useState(null);
  // const [videoId, setVideoId] = React.useState(null);
  const [selectedVideo, setSelectedVideo] = React.useState({});
  const [videoCards, setVideoCards] = React.useState(null);
  const [selectingVideo, setSelectingVideo] = React.useState(true);
  const [hasPermission, setHasPermission] = React.useState(true);
  const [editorOptions, setEditorOptions] = React.useState(null);

  React.useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("myTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#0a253a",
        },
      });
    });
    setEditorOptions({
      fontSize: 18,
      theme: "myTheme",
    });
  }, []);

  console.log("Lesson: ", props.lesson);

  function selectVideo(newVideo) {
    console.log("Selected ", newVideo);
    // setVideoId(newVideoId);
    setSelectedVideo(newVideo);
    setSelectingVideo(false);
  }

  React.useEffect(() => {
    console.log("User: ", user);
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

  React.useEffect(() => {
    setSelectedVideo(props.lesson.videos[0]);
    setVideoCards(
      props.lesson.videos.map((video, index) => {
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
          {props.lesson ? props.lesson.lessonName : "Loading..."}
        </h1>
        {!selectingVideo && (
          <div>
            <Button
              onClick={props.handleEnd}
              styles={{
                top: "auto",
                padding: "12px",
                marginRight: "8px",
                fontSize: "14px",
                color: "var(--secondary-color)",
                borderColor: "var(--secondary-color)",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
              text="Next lesson"
              type="transparent"
            />
            <Button
              onClick={() => setSelectingVideo(true)}
              styles={{
                top: "auto",
                padding: "12px",
                fontSize: "14px",
              }}
              text="Change video"
              type="accent"
            />
          </div>
        )}
      </div>
      {props.lesson && (
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
                height={"88%"}
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

export default Lesson;
