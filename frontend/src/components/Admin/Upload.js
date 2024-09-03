import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Upload.css';
import SideMenu from './SideMenu';
import Header from './Header';

// Set up the modal root element
Modal.setAppElement('#root');

const Upload = () => {
  const navigate = useNavigate();
  const [folderName, setFolderName] = useState('');
  const [bannerFile, setBannerFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();

    const backendUrl = `${process.env.REACT_APP_STREAMIFY_BACKEND_URL}/upload_media`;

    const formData = new FormData();
    formData.append('folder_name', folderName);
    if (bannerFile) formData.append('banner_file', bannerFile);
    if (videoFile) formData.append('video_file', videoFile);

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const result = await response.json();
      setUploadStatus(`Upload Successful: ${JSON.stringify(result)}`);

      // Open the modal on successful upload
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus(`Error: ${error.message}`);

      // Open the modal to show error message
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (uploadStatus.startsWith('Upload Successful')) {
      navigate('/admin');
    }
  };

  return (
    <div className="dashboard">
      <SideMenu />
      <div className="dashboard__content">
        <Header />
        <div className="upload-container">
          <h2>Upload Video Page</h2>
          <form className="upload-form" onSubmit={handleUpload}>
            <label htmlFor="folderName">Folder Name:</label>
            <input
              type="text"
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
            <label htmlFor="bannerFile">Upload Banner:</label>
            <input
              type="file"
              id="bannerFile"
              accept="image/*"
              onChange={(e) => setBannerFile(e.target.files[0])}
              required
            />
            <label htmlFor="videoFile">Upload Video:</label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
            <button type="submit">Upload</button>
          </form>
        </div>
        {/* Modal for showing status message */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Upload Status"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>{uploadStatus.startsWith('Error') ? 'Upload Failed!' : 'Upload Successful!'}</h2>
          <p>{uploadStatus}</p>
          <button onClick={closeModal} className="modal-button">OK</button>
        </Modal>
      </div>
    </div>
  );
};

export default Upload;
