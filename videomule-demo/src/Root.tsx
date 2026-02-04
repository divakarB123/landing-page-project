import { Composition } from "remotion";
import { VideoMuleDemo } from "./VideoMuleDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VideoMuleDemo"
        component={VideoMuleDemo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
