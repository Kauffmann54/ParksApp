import React, { useEffect, useRef } from 'react'
import './LoadingViewFull.css';
import Lottie from 'react-lottie';
import loadingJson from '../../assets/disney-logo.json';

interface LoadingViewFullProps {
  show: boolean;
}

export default function LoadingViewFull(props: LoadingViewFullProps) {
  const loadingViewBackground = useRef<HTMLDivElement>(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingJson,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice"
    }
  }

  useEffect(() => {
    if (props.show) {
      document.body.style.overflow = 'hidden';
      if (loadingViewBackground.current !== null) {
        loadingViewBackground.current.style.display = 'flex';
      }
    } else {
      document.body.style.overflow = 'auto';
      if (loadingViewBackground.current !== null) {
        loadingViewBackground.current.style.display = 'none';
      }
    }
  }, [props]);

  return (
    <div ref={loadingViewBackground} className="loading-view-full-background">
      <Lottie 
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={150}
        width={150}
        />
    </div>
  )
}
