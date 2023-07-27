import React from 'react'
import styles from './VideoJS.module.css'
import VideoPlayer from 'react-video-js-player'
import {DefaultPlayer as Video} from 'react-html5video'
import 'react-html5video/dist/styles.css'
// import freelancing from './Video/WhatIsFreelancing.mp4'
function VideoJS() {
    // const videoSrc=freelancing;
  return (
    <div className={styles.box2}>
      {/* <Video src="/Video/WhatIsFreelancing.mp4" width="720" height="420"><> */}
      <Video><source src="/Video/WhatIsFreelancing.mp4"/></Video>
    </div>

  )
}

export default VideoJS
