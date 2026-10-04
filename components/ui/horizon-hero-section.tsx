// horizon-hero-section.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface HorizonHeroProps {
  onMenuClick?: () => void;
  title1?: string;
  title2?: string;
  title3?: string;
  sub1Line1?: string;
  sub1Line2?: string;
  sub2Line1?: string;
  sub2Line2?: string;
}

export const Component: React.FC<HorizonHeroProps> = ({
  onMenuClick,
  title1 = 'HORIZON',
  title2 = 'COSMOS',
  title3 = 'YATHIN KUMAR',
  sub1Line1 = 'Where vision meets reality,',
  sub1Line2 = 'we shape the future of tomorrow',
  sub2Line1 = 'Beyond the boundaries of imagination,',
  sub2Line2 = 'lies the universe of possibilities'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 280 });
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;

  // Fade + render control written straight to the DOM so that scrolling never
  // triggers React re-renders, and the WebGL scene stops burning GPU the moment
  // the canvas has fully dissolved into the portfolio (post "ENTER ORBIT").
  const fadeOpacityRef = useRef(1);
  const renderActiveRef = useRef(true);

  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    sun: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    animate?: () => void;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations?: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    sun: null,
    mountains: [],
    animationId: null
  });

  // Authentic Three.js Horizon & Cosmos setup
  useEffect(() => {
    if (!canvasRef.current) return;
    const { current: refs } = threeRefs;

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x060614, 0.0004);

    refs.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      4000
    );
    refs.camera.position.set(0, 30, 280);

    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.65;

    // Post-processing
    refs.composer = new EffectComposer(refs.renderer);
    const renderPass = new RenderPass(refs.scene, refs.camera);
    refs.composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.68, // Balanced bloom strength
      0.38, // Radius
      0.68  // Threshold
    );
    refs.composer.addPass(bloomPass);

    createStarField();
    createSun();
    createNebula();
    createMountains();
    createAtmosphere();
    getLocation();

    animate();

    setIsReady(true);

    function createStarField() {
      const starCount = 3500;
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 300 + Math.random() * 1100;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = Math.abs(radius * Math.sin(phi) * Math.sin(theta)) * 0.85 + 15;
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.6) {
            color.setHSL(0.62, 0.35, 0.9);
          } else if (colorChoice < 0.85) {
            color.setHSL(0.08, 0.5, 0.85);
          } else {
            color.setHSL(0.75, 0.45, 0.85);
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2.0 + 0.6;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              float angle = time * 0.02 * (1.0 - depth * 0.2);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (280.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity * 0.85);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene?.add(stars);
        refs.stars.push(stars);
      }
    }

    function createSun() {
      // Radiant luminous celestial sun positioned in the mountain gap
      const sunGeo = new THREE.CircleGeometry(90, 48);
      const sunMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          coreColor: { value: new THREE.Color(0xffffff) },
          glowColor1: { value: new THREE.Color(0x99ddff) },
          glowColor2: { value: new THREE.Color(0xc084fc) }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform vec3 coreColor;
          uniform vec3 glowColor1;
          uniform vec3 glowColor2;
          uniform float time;

          void main() {
            float dist = length(vUv - vec2(0.5)) * 2.0;
            if (dist > 1.0) discard;

            float core = 1.0 - smoothstep(0.0, 0.35, dist);
            float innerGlow = 1.0 - smoothstep(0.2, 0.7, dist);
            float outerGlow = 1.0 - smoothstep(0.5, 1.0, dist);

            vec3 color = mix(glowColor1, coreColor, core);
            color = mix(glowColor2, color, innerGlow);

            float alpha = core + innerGlow * 0.65 + outerGlow * 0.3;
            gl_FragColor = vec4(color * 1.3, min(alpha, 1.0));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      const sun = new THREE.Mesh(sunGeo, sunMat);
      sun.position.set(0, 45, -380);
      refs.scene?.add(sun);
      refs.sun = sun;
    }

    function createNebula() {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 60, 60);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x1a0b36) },
          color2: { value: new THREE.Color(0x381254) },
          color3: { value: new THREE.Color(0x0f2b54) },
          opacity: { value: 0.38 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.006 + time * 0.3) * cos(pos.y * 0.006 + time * 0.3) * 28.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float wave1 = sin(vUv.x * 5.0 + time * 0.3) * cos(vUv.y * 5.0 + time * 0.3);
            vec3 col = mix(color1, color2, wave1 * 0.5 + 0.5);
            
            float distFromCenter = length(vUv - vec2(0.5, 0.4)) * 1.5;
            float alpha = opacity * (1.0 - smoothstep(0.0, 1.0, distFromCenter));
            
            gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.55));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.set(0, 80, -1000);
      refs.scene?.add(nebula);
      refs.nebula = nebula;
    }

    function createMountains() {
      const layers = [
        { distance: -60, height: 75, color: 0x070614, opacity: 1.0 },
        { distance: -120, height: 95, color: 0x0c0922, opacity: 0.95 },
        { distance: -180, height: 120, color: 0x140f32, opacity: 0.88 },
        { distance: -260, height: 145, color: 0x1e1548, opacity: 0.78 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 60;

        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = (t - 0.5) * 1400;

          let y = Math.sin(i * 0.28 + index * 1.5) * (layer.height * 0.45) +
                  Math.sin(i * 0.09) * (layer.height * 0.6) +
                  Math.cos(i * 0.55) * (layer.height * 0.2);

          if (index < 2) {
            const centerDist = Math.abs(t - 0.5) * 2;
            y -= (1 - smoothstep(0.0, 0.5, centerDist)) * (layer.height * 0.35);
          }

          y -= 30;
          points.push(new THREE.Vector2(x, y));
        }

        points.push(new THREE.Vector2(6000, -400));
        points.push(new THREE.Vector2(-6000, -400));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = -10 + index * 4;
        mountain.userData = {
          baseZ: layer.distance,
          baseY: -10 + index * 4,
          index
        };

        refs.scene?.add(mountain);
        refs.mountains.push(mountain);
      });
    }

    function createAtmosphere() {
      const geometry = new THREE.SphereGeometry(700, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
            vec3 atmosphere = vec3(0.25, 0.45, 0.85) * intensity;
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene?.add(atmosphere);
    }

    function getLocation() {
      const locations: number[] = [];
      refs.mountains.forEach((mountain, i) => {
        locations[i] = mountain.position.z;
      });
      refs.locations = locations;
    }

    function animate() {
      // Fully faded out: tear the loop down instead of leaving a no-op rAF
      // callback waking the main thread 60x/second. applyFade() restarts it.
      if (!renderActiveRef.current) {
        refs.animationId = null;
        return;
      }

      refs.animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      refs.stars.forEach((starField) => {
        if ((starField.material as THREE.ShaderMaterial).uniforms) {
          (starField.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
      });

      if (refs.nebula && (refs.nebula.material as THREE.ShaderMaterial).uniforms) {
        (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.3;
      }

      if (
        refs.camera &&
        refs.targetCameraX !== undefined &&
        refs.targetCameraY !== undefined &&
        refs.targetCameraZ !== undefined
      ) {
        const smoothing = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothing;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothing;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothing;

        const floatX = Math.sin(time * 0.1) * 1.2;
        const floatY = Math.cos(time * 0.14) * 0.8;

        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;

        refs.camera.lookAt(0, 15, -600);
      }

      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.3;
        mountain.position.x = Math.sin(time * 0.08) * 1.2 * parallaxFactor;
      });

      if (refs.composer) {
        refs.composer.render();
      }
    }

    refs.animate = animate;

    const handleResize = () => {
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }
      window.removeEventListener('resize', handleResize);

      refs.stars.forEach((starField) => {
        starField.geometry.dispose();
        (starField.material as THREE.Material).dispose();
      });

      refs.mountains.forEach((mountain) => {
        mountain.geometry.dispose();
        (mountain.material as THREE.Material).dispose();
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }

      if (refs.sun) {
        refs.sun.geometry.dispose();
        (refs.sun.material as THREE.Material).dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  function smoothstep(min: number, max: number, value: number) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  // Applies the hero -> portfolio dissolve without going through React state.
  const applyFade = (opacity: number, force = false) => {
    const clamped = Math.max(0, Math.min(1, opacity));
    if (!force && clamped === fadeOpacityRef.current) return;
    fadeOpacityRef.current = clamped;

    const canvas = canvasRef.current;
    if (canvas) canvas.style.opacity = String(clamped);

    const menu = menuRef.current;
    if (menu) {
      const menuVisible = clamped > 0.1;
      menu.style.opacity = menuVisible ? '1' : '0';
      menu.style.pointerEvents = menuVisible ? 'auto' : 'none';
    }

    // Stop rendering as soon as the canvas is invisible; the frozen frame keeps
    // fading out via the existing CSS transition. Restart it when scrolled back.
    const wasActive = renderActiveRef.current;
    renderActiveRef.current = clamped > 0;
    if (!wasActive && renderActiveRef.current) {
      const refs = threeRefs.current;
      if (refs.animationId === null && refs.animate) refs.animate();
    }
  };

  // GSAP Entrance
  useEffect(() => {
    if (!isReady) return;

    gsap.set([menuRef.current, titleRef.current, subtitleRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      });
    }

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.title-char');
      if (chars.length > 0) {
        tl.from(
          chars,
          {
            y: 160,
            opacity: 0,
            scale: 0.85,
            duration: 1.3,
            stagger: 0.04,
            ease: 'power4.out'
          },
          '-=0.6'
        );
      }
    }

    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(
        lines,
        {
          y: 35,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        },
        '-=0.8'
      );
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // The entrance timeline owns the side menu's inline styles while it runs;
  // re-assert the fade state once it has finished (covers reloading the page
  // while already scrolled deep into the portfolio).
  useEffect(() => {
    if (!isReady) return;
    const timer = window.setTimeout(() => {
      applyFade(fadeOpacityRef.current, true);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [isReady]);

  // Smooth scroll handling for the 3 Hero sections + Grand Transition into Portfolio
  useEffect(() => {
    // Layout read cached: measuring offsetHeight on every scroll event forces
    // the engine to reconcile layout mid-scroll. The hero is 3x min-h-screen,
    // so its height only changes on resize.
    const measureHeroHeight = () =>
      Math.max((containerRef.current?.offsetHeight ?? window.innerHeight) - window.innerHeight, 1);
    let heroHeight = measureHeroHeight();
    const handleResize = () => {
      heroHeight = measureHeroHeight();
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Hero progress: strictly 0.0 to 1.0 across the 3 sections
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

      // GRAND TRANSITION: As scroll passes the end of hero into portfolio,
      // canvas smoothly dissolves into the pristine dark space background
      const fadeStart = heroHeight * 0.82;
      const fadeEnd = heroHeight + window.innerHeight * 0.35;
      let opacity = 1;
      if (scrollY > fadeStart) {
        opacity = Math.max(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart), 0);
      }
      applyFade(opacity);

      // Canvas fully dissolved: nothing in the 3D scene is visible anymore, so
      // bail out before any camera/mountain bookkeeping. This keeps the scroll
      // path in the portfolio essentially free.
      if (fadeOpacityRef.current <= 0) return;

      const { current: refs } = threeRefs;

      const totalSectionsLocal = totalSections;
      const totalProgress = progress * totalSectionsLocal;
      const newSection = Math.min(Math.floor(totalProgress), totalSectionsLocal);
      const sectionProgress = totalProgress % 1;

      // Authentic camera positions: Section 0 (HORIZON) -> Section 1 (COSMOS) -> Section 2 (YATHIN KUMAR)
      const cameraPositions = [
        { x: 0, y: 30, z: 280 }, // Section 0 - HORIZON
        { x: 0, y: 45, z: -40 }, // Section 1 - COSMOS
        { x: 0, y: 60, z: -600 } // Section 2 - YATHIN KUMAR (Into the open cosmos)
      ];

      const currentPos = cameraPositions[newSection] || cameraPositions[0];
      const nextPos = cameraPositions[Math.min(newSection + 1, cameraPositions.length - 1)] || currentPos;

      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      // Parallax for mountains: In final section (Yathin Kumar), mountains break away into infinity
      refs.mountains.forEach((mountain, i) => {
        if (progress > 0.72) {
          mountain.position.z = 600000;
        } else if (refs.locations) {
          mountain.position.z = refs.locations[i] + scrollY * 0.15;
        }
      });

      // Lift sun as user scrolls to simulate celestial dawn
      if (refs.sun) {
        refs.sun.position.y = 45 + progress * 55;
      }

      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z - 200;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [totalSections]);

  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char inline-block will-change-transform">
        {char}
      </span>
    ));
  };

  const sectionsData = [
    {
      title: title2, // 'COSMOS'
      sub1: sub2Line1,
      sub2: sub2Line2
    },
    {
      title: title3, // 'YATHIN KUMAR'
      sub1: 'B.Tech in Computer Science & Engineering (AI & ML)',
      sub2: 'Vellore Institute of Technology, Chennai • Batch of 2030'
    }
  ];

  return (
    <div ref={containerRef} className="hero-container cosmos-style relative w-full text-white select-none">
      {/* 3D WebGL Canvas: FIXED full-screen with ZERO split-screen cutoff, smoothly dissolving as you enter the portfolio */}
      {/* Opacity is written directly from the scroll position (applyFade), so no
          CSS transition is needed here — a pending transition can stall in Chromium
          and leave the canvas stuck visible/blank. */}
      <canvas
        ref={canvasRef}
        className="hero-canvas fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Side menu - Active in hero */}
      <div
        ref={menuRef}
        onClick={onMenuClick}
        className="side-menu fixed top-1/2 -translate-y-1/2 left-6 md:left-8 z-40 flex flex-col items-center gap-6 cursor-pointer group transition-all"
        style={{ visibility: 'hidden' }}
        title="Open Navigation"
      >
        <div className="menu-icon flex flex-col gap-1.5 p-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 group-hover:border-rose-500/50 transition-colors shadow-lg">
          <span className="block w-6 h-[2px] bg-white group-hover:bg-rose-400 transition-colors"></span>
          <span className="block w-6 h-[2px] bg-white group-hover:bg-rose-400 transition-colors"></span>
          <span className="block w-6 h-[2px] bg-white group-hover:bg-rose-400 transition-colors"></span>
        </div>
        <div className="vertical-text text-[11px] font-mono tracking-[0.35em] text-white/90 uppercase [writing-mode:vertical-lr] rotate-180 group-hover:text-rose-400 transition-colors drop-shadow-md font-bold">
          SPACE
        </div>
      </div>

      {/* Hero Text Sections scrolling smoothly over the fixed canvas */}
      <div className="relative z-10">
        {/* Section 0: HORIZON Initial Screen */}
        <div className="hero-content cosmos-content min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
          <h1
            ref={titleRef}
            className="hero-title font-extrabold text-[18vw] md:text-[14vw] tracking-tighter leading-none select-none text-[#ff3b3b] drop-shadow-[0_0_50px_rgba(255,59,59,0.9)] drop-shadow-[0_0_100px_rgba(255,59,59,0.45)] font-['Space_Grotesk']"
          >
            {splitTitle(title1)}
          </h1>

          <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle mt-8 md:mt-12 space-y-1 text-sm md:text-base font-light tracking-widest text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            <p className="subtitle-line">{sub1Line1}</p>
            <p className="subtitle-line">{sub1Line2}</p>
          </div>
        </div>

        {/* Section 1: COSMOS & Section 2: YATHIN KUMAR */}
        <div className="scroll-sections">
          {sectionsData.map((sec, i) => (
            <section
              key={i}
              className="content-section min-h-screen flex flex-col items-center justify-center text-center px-4"
            >
              <h1 className="hero-title font-extrabold text-[18vw] md:text-[14vw] tracking-tighter leading-none select-none text-[#ff3b3b] drop-shadow-[0_0_55px_rgba(255,59,59,0.95)] drop-shadow-[0_0_110px_rgba(255,59,59,0.5)] font-['Space_Grotesk']">
                {sec.title}
              </h1>

              <div className="hero-subtitle cosmos-subtitle mt-8 md:mt-12 space-y-1 text-sm md:text-base font-light tracking-widest text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                <p className="subtitle-line">{sec.sub1}</p>
                <p className="subtitle-line">{sec.sub2}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component;
