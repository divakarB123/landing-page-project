import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";

// Color palette
const colors = {
  primary: "#6366f1", // Indigo
  secondary: "#8b5cf6", // Purple
  accent: "#06b6d4", // Cyan
  dark: "#0f172a",
  light: "#f8fafc",
  gradient1: "#4f46e5",
  gradient2: "#7c3aed",
};

// Intro Scene - Logo and Tagline
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });

  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1e1b4b 50%, ${colors.dark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: colors.accent,
            opacity: 0.3,
            left: `${10 + (i * 4.5) % 80}%`,
            top: `${15 + (i * 3.7) % 70}%`,
            transform: `translateY(${Math.sin(frame / 20 + i) * 20}px)`,
          }}
        />
      ))}

      <div style={{ transform: `scale(${logoScale})`, textAlign: "center" }}>
        {/* Logo Icon */}
        <div
          style={{
            width: 120,
            height: 120,
            margin: "0 auto 30px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
          }}
        >
          <svg width="70" height="70" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Logo Text */}
        <h1
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: colors.light,
            margin: 0,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-2px",
          }}
        >
          Video<span style={{ color: colors.accent }}>Mule</span>
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 180,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        <p
          style={{
            fontSize: 36,
            color: colors.light,
            opacity: 0.9,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 400,
          }}
        >
          AI Video Editor & Voiceover Generator
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay: number;
  index: number;
}> = ({ icon, title, description, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const x = index % 2 === 0 ? -100 : 100;

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: 20,
        padding: "30px 40px",
        width: 400,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        opacity: appear,
        transform: `translateX(${interpolate(appear, [0, 1], [x, 0])}px)`,
      }}
    >
      <div style={{ fontSize: 50, marginBottom: 15 }}>{icon}</div>
      <h3
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: colors.light,
          margin: "0 0 10px 0",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 18,
          color: "rgba(255, 255, 255, 0.7)",
          margin: 0,
          lineHeight: 1.5,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {description}
      </p>
    </div>
  );
};

// Features Scene
const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1e1b4b 100%)`,
        padding: 80,
      }}
    >
      <h2
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: colors.light,
          textAlign: "center",
          marginBottom: 60,
          fontFamily: "system-ui, -apple-system, sans-serif",
          opacity: titleOpacity,
        }}
      >
        Powerful <span style={{ color: colors.accent }}>Features</span>
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <FeatureCard
          icon="🎙️"
          title="AI Voiceover"
          description="100+ human voices in 35+ languages"
          delay={10}
          index={0}
        />
        <FeatureCard
          icon="📝"
          title="Auto Script Sync"
          description="Automatic script generation & voice sync"
          delay={20}
          index={1}
        />
        <FeatureCard
          icon="🌍"
          title="Localization"
          description="Translate to multiple languages instantly"
          delay={30}
          index={2}
        />
        <FeatureCard
          icon="✏️"
          title="Full Control"
          description="Edit every word and adjust timing"
          delay={40}
          index={3}
        />
      </div>
    </AbsoluteFill>
  );
};

// How It Works Scene
const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { num: "1", text: "Record your screen", icon: "🖥️" },
    { num: "2", text: "Upload to VideoMule", icon: "☁️" },
    { num: "3", text: "AI generates voiceover", icon: "🤖" },
    { num: "4", text: "Export professional video", icon: "🎬" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1e1b4b 0%, ${colors.dark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: colors.light,
          textAlign: "center",
          marginBottom: 80,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        How It <span style={{ color: colors.primary }}>Works</span>
      </h2>

      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {steps.map((step, i) => {
          const delay = i * 15;
          const appear = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12 },
          });

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  textAlign: "center",
                  opacity: appear,
                  transform: `scale(${appear}) translateY(${interpolate(appear, [0, 1], [50, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto 20px",
                    fontSize: 45,
                    boxShadow: "0 10px 40px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  {step.icon}
                </div>
                <p
                  style={{
                    fontSize: 22,
                    color: colors.light,
                    fontWeight: 600,
                    margin: 0,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    maxWidth: 160,
                  }}
                >
                  {step.text}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 60,
                    height: 4,
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                    opacity: spring({ frame: frame - delay - 10, fps, config: { damping: 12 } }),
                    borderRadius: 2,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Demo Scene - Simulated Interface
const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowAppear = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const waveProgress = interpolate(frame, [30, 90], [0, 100], {
    extrapolateRight: "clamp",
  });

  const textProgress = Math.floor(interpolate(frame, [20, 80], [0, 45], {
    extrapolateRight: "clamp",
  }));

  const sampleText = "Welcome to our product demo. Let me show you how easy it is to use our platform...";

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1e1b4b 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Mock App Window */}
      <div
        style={{
          width: 1400,
          height: 800,
          background: "#1a1a2e",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.5)",
          opacity: windowAppear,
          transform: `scale(${windowAppear})`,
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            height: 50,
            background: "#16162a",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 10,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28c840" }} />
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              marginLeft: 20,
              fontFamily: "system-ui",
              fontSize: 14,
            }}
          >
            VideoMule Editor
          </span>
        </div>

        {/* Content */}
        <div style={{ display: "flex", height: "calc(100% - 50px)" }}>
          {/* Video Preview */}
          <div
            style={{
              flex: 2,
              background: "#0f0f1a",
              margin: 20,
              borderRadius: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 500,
                height: 300,
                background: `linear-gradient(135deg, ${colors.gradient1} 0%, ${colors.gradient2} 100%)`,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white" opacity={0.9}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Script Panel */}
          <div
            style={{
              flex: 1,
              background: "#16162a",
              margin: "20px 20px 20px 0",
              borderRadius: 12,
              padding: 25,
            }}
          >
            <h3
              style={{
                color: colors.light,
                fontSize: 18,
                margin: "0 0 20px 0",
                fontFamily: "system-ui",
              }}
            >
              AI Generated Script
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 16,
                lineHeight: 1.8,
                fontFamily: "system-ui",
              }}
            >
              {sampleText.slice(0, textProgress)}
              <span
                style={{
                  borderRight: "2px solid",
                  borderColor: frame % 30 < 15 ? colors.accent : "transparent",
                }}
              />
            </p>

            {/* Audio Waveform */}
            <div style={{ marginTop: 30 }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 10 }}>
                AI Voiceover
              </p>
              <div
                style={{
                  height: 60,
                  background: "#0f0f1a",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 15px",
                  gap: 3,
                  overflow: "hidden",
                }}
              >
                {[...Array(40)].map((_, i) => {
                  const height = 10 + Math.sin(i * 0.5 + frame * 0.1) * 15 + Math.random() * 5;
                  const isActive = (i / 40) * 100 < waveProgress;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: isActive ? height : 4,
                        background: isActive
                          ? `linear-gradient(180deg, ${colors.primary}, ${colors.accent})`
                          : "rgba(255,255,255,0.2)",
                        borderRadius: 2,
                        transition: "height 0.1s",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Call to Action Scene
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const buttonPulse = 1 + Math.sin(frame * 0.1) * 0.03;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1e1b4b 50%, ${colors.dark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Glowing orbs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
          top: "20%",
          left: "20%",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${colors.accent}40 0%, transparent 70%)`,
          bottom: "20%",
          right: "25%",
          filter: "blur(60px)",
        }}
      />

      <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
        <h2
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: colors.light,
            margin: "0 0 30px 0",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1.2,
          }}
        >
          Turn Screen Recordings
          <br />
          Into <span style={{ color: colors.accent }}>Pro Videos</span>
        </h2>

        <p
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: 50,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          No studio. No voice actor. Just AI magic.
        </p>

        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 50,
            transform: `scale(${buttonPulse})`,
            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: colors.light,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Try VideoMule.ai Free
          </span>
        </div>

        <p
          style={{
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.5)",
            marginTop: 30,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          videomule.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Main Video Component
export const VideoMuleDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.dark }}>
      <Sequence from={0} durationInFrames={90}>
        <IntroScene />
      </Sequence>
      <Sequence from={90} durationInFrames={100}>
        <FeaturesScene />
      </Sequence>
      <Sequence from={190} durationInFrames={100}>
        <HowItWorksScene />
      </Sequence>
      <Sequence from={290} durationInFrames={90}>
        <DemoScene />
      </Sequence>
      <Sequence from={380} durationInFrames={70}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
