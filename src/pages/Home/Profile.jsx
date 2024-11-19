import { useState, useEffect, useContext } from 'react';
import './styles/Profile.css';
import { auth, setUserData } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';
import Button from '../../components/Button';
import { CourseContext } from '../../context/CourseContext';
import CourseCard from '../../components/CourseCard';
import editIcon from '../../assets/pencil.svg';
import Popup from '../../components/Popup';
import TextInput from '../../components/TextInput';

export default function Profile() {
    const { user } = useContext(UserContext);
    const { courses } = useContext(CourseContext);
    const [completedCourseCards, setCompletedCourseCards] = useState([]);
    const [completedCareerPaths, setCompletedCareerPaths] = useState([]);
    const [editProfileVisible, setEditProfileVisible] = useState(false);
    const [newInfo, setNewInfo] = useState({
        displayName: auth.currentUser.displayName,
        username: user ? user.username : 'Username',
        bio: user ? user.bio : 'Bio',
    });

    function openEditProfileModal() {
        setEditProfileVisible(true);
    }

    async function handleConfirm() {
        setUserData(newInfo.username, 'username');
        setUserData(newInfo.bio, 'bio');
        if (auth.currentUser.displayName === 'Unnamed User') {
            await updateProfile(auth.currentUser, {
                displayName: `${newInfo.displayName.split(' ')[0]} ${
                    newInfo.displayName.split(' ')[1]
                }`,
            });
        }
        setEditProfileVisible(false);
    }

    useEffect(() => {
        if (user?.completedCourses && courses) {
            setCompletedCourseCards(
                user.completedCourses.map((course) => (
                    <CourseCard courseName={course.name} />
                ))
            );
        }
    }, [user, courses]);

    return (
        <div className="profile">
            {editProfileVisible && (
                <Popup
                    onCancel={() => setEditProfileVisible(false)}
                    onConfirm={handleConfirm}
                    title="Edit profile"
                >
                    {auth.currentUser.displayName === 'Unnamed User' && (
                        <div className="name-input-container">
                            <TextInput
                                type="text"
                                value={newInfo.displayName.split(' ')[0]}
                                onChange={(event) =>
                                    setNewInfo((prevInfo) => ({
                                        ...prevInfo,
                                        displayName: `${event.target.value.replace(
                                            ' ',
                                            ''
                                        )} ${
                                            prevInfo.displayName.split(' ')[1]
                                        }`,
                                    }))
                                }
                                title="First name"
                            />
                            <TextInput
                                type="text"
                                value={newInfo.displayName.split(' ')[1]}
                                onChange={(event) =>
                                    setNewInfo((prevInfo) => ({
                                        ...prevInfo,
                                        displayName: `${
                                            prevInfo.displayName.split(' ')[0]
                                        } ${event.target.value.replace(
                                            ' ',
                                            ''
                                        )}`,
                                    }))
                                }
                                title="Last name"
                            />
                        </div>
                    )}
                    <TextInput
                        type="text"
                        value={newInfo.username}
                        onChange={(event) =>
                            setNewInfo((prevInfo) => ({
                                ...prevInfo,
                                username: event.target.value.replace(' ', ''),
                            }))
                        }
                        title="Username"
                    />
                    <TextInput
                        type="text"
                        value={newInfo.bio}
                        onChange={(event) =>
                            setNewInfo((prevInfo) => ({
                                ...prevInfo,
                                bio: event.target.value,
                            }))
                        }
                        title="Bio"
                    />
                </Popup>
            )}
            <div className="info">
                <h1 className="secondary-text bold display-name">
                    {auth.currentUser.displayName}
                </h1>
                <h3 className="secondary-text username">
                    <span className="bold">Username:</span> {user?.username}
                </h3>
                <p className="body-text">
                    <span className="bold">Bio:</span> {user.bio}
                </p>
                <Button
                    styles={{
                        aspectRatio: '1',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={openEditProfileModal}
                    type="accent"
                >
                    <img src={editIcon} alt="Edit profile information" />
                </Button>
            </div>
            <div className="content">
                {completedCourseCards.length > 0 && (
                    <div>
                        <h2 className="secondary-text bold section-header">
                            Completed courses
                        </h2>
                        {completedCourseCards}
                    </div>
                )}
                {completedCareerPaths.length > 0 && (
                    <div>
                        <h2 className="secondary-text bold section-header">
                            Completed career paths
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}
