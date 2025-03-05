import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioPlayerTD = ({selectedTableRow }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const audioPath="/Video1.mp3";

  useEffect(() => {
    if (!audioPath) return; // Ensure there's a valid audio file

    // Initialize WaveSurfer instance
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'lightgreen',
      progressColor: 'darkgreen',
      height: 70,
      barWidth: 2,
      barHeight: 1,
      responsive: true,
      normalize: true,
    });

    // Load the audio file
    wavesurferRef.current.load(audioPath);

    // When the audio file is ready
    wavesurferRef.current.on('ready', () => {
      setDuration(wavesurferRef.current.getDuration());
    });

    // Update current time while playing
    wavesurferRef.current.on('audioprocess', () => {
      setCurrentTime(wavesurferRef.current.getCurrentTime());
    });

    // Cleanup on unmount
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioPath]);

  const togglePlay = () => {
    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const seekPosition = event.nativeEvent.offsetX / waveformRef.current.offsetWidth;
    wavesurferRef.current.seekTo(seekPosition);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='flex flex-col gap-3 p-4 border rounded-lg shadow-md bg-white w-full max-w-xl mx-auto'>
      <div className='h-[80px] bg-gray-100 rounded-md p-2'>
        <div ref={waveformRef} className='h-[100%] w-[95%] mx-auto' />
      </div>
      
      <div className="container">
        <button onClick={togglePlay} className={`${isPlaying? 'btn btn-danger':'btn btn-success '} text-white mb-2 mx-2 btn-sm`}
      >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <span className="text-gray-600 text-sm font-medium">{formatTime(currentTime)} / {formatTime(duration)}</span>

        <div
          className="relative w-full h-2 bg-gray-300 rounded-md overflow-hidden cursor-pointer"
          onClick={handleSeek}
        >
          <div
             style={{
              width: `${(currentTime / duration) * 100}%`,
              height: '100%',
              backgroundColor: 'darkgreen',
            }}
          />
        </div>
      </div>
      <div>{Object.entries(selectedTableRow)
  .filter(([key]) => key === "Talkdesk Phone Number")
  .map(([key, value], index) => (
    <div 
  key={index} 
  className="transition-colors duration-200 hover:bg-green-50 hover:rounded-lg group flex items-center"
>
  <div className="font-bold text-green-700 text-xs p-2 w-2/5 bg-green-50/30 group-hover:bg-green-100 transition-colors text-center">
     IVR Flow
  </div>
  <div className="text-gray-900 text-xs p-2 w-3/5 font-medium group-hover:text-green-800 transition-colors">
    {value.slice(15,-1)}
  </div>
</div>
  ))}
</div>
<button 
  className="
    bg-green-500 
    text-white 
    text-xs 
    w-[30%] 
    mx-auto 
    py-2 
    px-4 
    mt-4 
    rounded-lg 
    hover:bg-green-600 
    active:bg-green-700 
    focus:outline-none 
    focus:ring-2 
    focus:ring-green-500 
    focus:ring-opacity-50 
    transition-all 
    duration-200 
    transform 
    hover:scale-105 
    active:scale-95 
    shadow-md 
    hover:shadow-lg
  "
>
  Download
</button>
    </div>
  );
};

export default AudioPlayerTD;
