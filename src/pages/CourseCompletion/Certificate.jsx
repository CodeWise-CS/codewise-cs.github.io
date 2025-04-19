import './styles/Certificate.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import codewiseLogo from '/codewise-logo.svg';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Loader from '../../components/Loader';

export default function Certificate({
    fullName,
    username,
    accuracy,
    imageURL,
    courseDisplayName,
}) {
    const certificateRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    function printDocument() {
        setContainerWidth(1410);
        setIsDownloading(true);
        certificateRef.current.style.width = `1410px`;
        certificateRef.current.style.height = `1000px`;
    }

    useEffect(() => {
        if (isDownloading) {
            const excludedElement = document.getElementById('exclude');
            const originalDisplay = excludedElement.style.display;

            excludedElement.style.display = 'none';
            document.querySelector(
                '.course-completion .certificate-container'
            ).style.overflow = 'visible';

            html2canvas(certificateRef.current, {
                useCORS: true,
            }).then((canvas) => {
                excludedElement.style.display = originalDisplay;
                document.querySelector(
                    '.course-completion .certificate-container'
                ).style.overflow = 'hidden';
                certificateRef.current.style.width = ``;
                certificateRef.current.style.height = ``;

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('landscape', 'mm', 'a4');
                const pageWidth = 297;
                const pageHeight = 210;

                const imgWidth = pageWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
                pdf.save(`CodeWise ${courseDisplayName} certificate.pdf`);
                setContainerWidth(certificateRef.current.offsetWidth);
                setIsDownloading(false);
            });
        }
    }, [isDownloading]);

    useEffect(() => {
        const updateWidth = () => {
            if (certificateRef.current) {
                setContainerWidth(certificateRef.current.offsetWidth);
            }
        };

        updateWidth();

        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <>
            {isDownloading && (
                <div className="loader-container">
                    <Loader text="Downloading..." />
                </div>
            )}
            <div className="certificate" ref={certificateRef}>
                <button
                    className="download-button interactable"
                    id="exclude"
                    onClick={printDocument}
                >
                    Download
                </button>
                <img className="logo" src={codewiseLogo} alt="" />
                <h2
                    className="title secondary-text"
                    style={{ fontSize: `${containerWidth / 28}px` }}
                >
                    <span style={{ fontSize: `${containerWidth / 18}px` }}>
                        Certificate
                    </span>
                    <br />
                    of Completion
                </h2>
                <div className="separator"></div>
                <h1
                    className="full-name secondary-text"
                    style={{ fontSize: `${containerWidth / 15}px` }}
                >
                    {fullName}
                </h1>
                <p
                    className="body-text"
                    style={{ fontSize: `${containerWidth / 38}px` }}
                >
                    successfully completed the
                    <br />
                    <span className="bold accent-text">
                        {courseDisplayName}
                    </span>{' '}
                    course
                </p>
                <div className="bottom-container">
                    <p
                        className="body-text"
                        style={{ fontSize: `${containerWidth / 50}px` }}
                    >
                        <span
                            className="info"
                            style={{ fontSize: `${containerWidth / 40}px` }}
                        >
                            {username}
                        </span>
                        <br />
                        Username
                    </p>
                    <img
                        src={imageURL}
                        alt={`${courseDisplayName} logo`}
                        className="course-logo"
                    />
                    <p
                        className="body-text"
                        style={{ fontSize: `${containerWidth / 50}px` }}
                    >
                        <span
                            className="info"
                            style={{ fontSize: `${containerWidth / 40}px` }}
                        >
                            {accuracy}%
                        </span>
                        <br />
                        Test accuracy
                    </p>
                </div>
            </div>
        </>
    );
}
