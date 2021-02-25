import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './cameraSlice';
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css';

const videoConstrints = {
  width: 250,
  height: 400,
  facingModer: 'user',
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    history.push('/preview');
  }, [webcamRef]);

  return (
    <div className='webcamCapture'>
      <Webcam
        audio={false}
        height={videoConstrints.height}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={videoConstrints.width}
        videoConstraints={videoConstrints}
      />
      <RadioButtonUncheckedIcon
        className='webcamCapture_button'
        onClick={capture}
        fontSize='large'
      />
    </div>
  );
}

export default WebcamCapture;
