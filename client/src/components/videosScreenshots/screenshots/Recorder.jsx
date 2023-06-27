import { useState, useRef } from "react";
import { motion } from "framer-motion";

const AudioRecorder = ({ setAudioBlob }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          setAudioBlob(audioBlob);
          audioChunks.length = 0;
        });

        mediaRecorder.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      {recording ? (
        <motion.i
          onClick={stopRecording}
          whileTap={{ scale: 0.9 }}
          className="fa-solid fa-microphone bg-red-500 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer mt-5"
        ></motion.i>
      ) : (
        <motion.i
          onClick={startRecording}
          whileTap={{ scale: 0.9 }}
          className="fa-solid fa-microphone bg-green-500 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer mt-5"
        ></motion.i>
      )}
    </div>
  );
};

export default AudioRecorder;
