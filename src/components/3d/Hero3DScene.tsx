import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCart } from '../../context/CartContext';
import { Wifi, Sparkles, Smartphone, Check } from 'lucide-react';

/* --- PROCEDURAL LATTE ART TEXTURE --- */
function useLatteArtTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Deep rich espresso base
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    grad.addColorStop(0, '#533622');
    grad.addColorStop(0.5, '#3B2314');
    grad.addColorStop(1, '#25150C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Crema marbling
    ctx.strokeStyle = 'rgba(217, 173, 104, 0.4)';
    ctx.lineWidth = 14;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.arc(256, 256, 80 + i * 22, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Rosetta / Heart foam pattern
    ctx.fillStyle = '#FAF5ED';
    ctx.shadowColor = 'rgba(83, 54, 34, 0.5)';
    ctx.shadowBlur = 10;

    // Heart lobes
    ctx.beginPath();
    ctx.moveTo(256, 320);
    ctx.bezierCurveTo(200, 260, 170, 180, 256, 170);
    ctx.bezierCurveTo(342, 180, 312, 260, 256, 320);
    ctx.fill();

    // Internal layered rosetta leaves
    for (let j = 0; j < 5; j++) {
      const y = 180 + j * 24;
      const w = 45 - j * 6;
      ctx.beginPath();
      ctx.ellipse(256, y, w, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = j % 2 === 0 ? '#FAF5ED' : '#F3E9DD';
      ctx.fill();
    }

    // Stem line cutting through
    ctx.strokeStyle = '#432615';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(256, 160);
    ctx.lineTo(256, 335);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);
}

/* --- STEAM PARTICLES --- */
function SteamPuff() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 38;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 0.22;
      pos[i * 3 + 1] = Math.random() * 1.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.22;
    }
    return pos;
  }, [count]);

  const elapsedRef = useRef(0);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // drift upward
      pos[i * 3 + 1] += delta * (0.35 + (i % 3) * 0.1);
      // subtle sine wave sway
      pos[i * 3 + 0] += Math.sin(t * 2 + i) * 0.002;
      if (pos[i * 3 + 1] > 1.6) {
        pos[i * 3 + 1] = 0.1;
        pos[i * 3 + 0] = (Math.random() - 0.5) * 0.22;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, 0.45, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#FAF5ED"
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* --- CERAMIC CUP & LATTE --- */
function CoffeeCup() {
  const latteTexture = useLatteArtTexture();

  return (
    <group position={[-0.85, 0.15, -0.2]}>
      {/* Saucer */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.5, 0.06, 36]} />
        <meshStandardMaterial color="#FAF5ED" roughness={0.25} metalness={0.08} />
      </mesh>
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.02, 36]} />
        <meshStandardMaterial color="#E6DFD3" roughness={0.3} />
      </mesh>

      {/* Ceramic Cup Body */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.32, 0.55, 36]} />
        <meshStandardMaterial color="#FAF5ED" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Gold Rim Band */}
      <mesh position={[0, 0.49, 0]}>
        <torusGeometry args={[0.48, 0.012, 16, 36]} />
        <meshStandardMaterial color="#D9AD68" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Cup Handle */}
      <mesh position={[-0.48, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.18, 0.055, 16, 24, Math.PI]} />
        <meshStandardMaterial color="#FAF5ED" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Coffee Surface with Latte Art */}
      <mesh position={[0, 0.44, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 4]}>
        <circleGeometry args={[0.45, 36]} />
        <meshStandardMaterial map={latteTexture} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Steam rising */}
      <SteamPuff />
    </group>
  );
}

/* --- POTTED SUCCULENT --- */
function PottedPlant() {
  return (
    <group position={[-0.2, 0.15, -1.3]}>
      {/* Terracotta Pot */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.24, 0.42, 28]} />
        <meshStandardMaterial color="#B9684A" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Pot Rim */}
      <mesh position={[0, 0.41, 0]}>
        <torusGeometry args={[0.34, 0.04, 16, 28]} />
        <meshStandardMaterial color="#B9684A" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Dark Soil */}
      <mesh position={[0, 0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.32, 24]} />
        <meshStandardMaterial color="#221711" roughness={0.95} />
      </mesh>
      {/* Succulent Leaves */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI) / 3;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.16, 0.44, Math.sin(angle) * 0.16]}
            rotation={[0.3 * Math.cos(angle), angle, 0.3 * Math.sin(angle)]}
            castShadow
          >
            <coneGeometry args={[0.1, 0.25, 5]} />
            <meshStandardMaterial color="#8F9E83" roughness={0.6} />
          </mesh>
        );
      })}
      {/* Center bud */}
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#A3B495" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* --- WATER GLASS --- */
function WaterGlass() {
  return (
    <group position={[-1.4, 0.15, -0.9]}>
      {/* Glass Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.22, 0.7, 24]} />
        <meshPhysicalMaterial
          color="#FAF5ED"
          transparent
          opacity={0.35}
          roughness={0.05}
          transmission={0.9}
          thickness={0.4}
          ior={1.48}
        />
      </mesh>
      {/* Water Level */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.24, 0.21, 0.52, 24]} />
        <meshStandardMaterial
          color="#CDE8F5"
          transparent
          opacity={0.4}
          roughness={0.1}
        />
      </mesh>
      {/* Lime slice on rim */}
      <mesh position={[0.22, 0.68, 0]} rotation={[0.4, 0.5, 0.8]}>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 16]} />
        <meshStandardMaterial color="#A8C846" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* --- WIRELESS WAVES & ENERGY PARTICLES --- */
function WirelessWaves({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const elapsedRef = useRef(0);

  useFrame((_state, delta) => {
    if (!ring1Ref.current || !ring2Ref.current || !ring3Ref.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current * 2.5;

    // Expanding pulse waves towards phone
    const s1 = 1 + (t % 1) * 0.8;
    const s2 = 1 + ((t + 0.33) % 1) * 0.8;
    const s3 = 1 + ((t + 0.66) % 1) * 0.8;

    ring1Ref.current.scale.set(s1, s1, 1);
    ring2Ref.current.scale.set(s2, s2, 1);
    ring3Ref.current.scale.set(s3, s3, 1);

    (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (t % 1)) * (active ? 0.9 : 0.4);
    (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - ((t + 0.33) % 1)) * (active ? 0.9 : 0.4);
    (ring3Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - ((t + 0.66) % 1)) * (active ? 0.9 : 0.4);
  });

  return (
    <group ref={groupRef} position={[0.45, 0.22, 0.25]} rotation={[-Math.PI / 2, 0, 0.5]}>
      <mesh ref={ring1Ref}>
        <ringGeometry args={[0.45, 0.48, 32]} />
        <meshBasicMaterial color="#D9AD68" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.55, 0.58, 32]} />
        <meshBasicMaterial color="#D9AD68" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring3Ref}>
        <ringGeometry args={[0.65, 0.68, 32]} />
        <meshBasicMaterial color="#C88D56" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* --- NFC TABLE DISC --- */
function NfcDisc({ active, onTriggerTap }: { active: boolean; onTriggerTap: () => void }) {
  const meshRef = useRef<THREE.Group>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const elapsedRef = useRef(0);

  useFrame((_state, delta) => {
    if (glowLightRef.current) {
      elapsedRef.current += delta;
      const t = elapsedRef.current;
      const pulse = active
        ? 3.5 + Math.sin(t * 12) * 1.5
        : 0.8 + Math.sin(t * 2) * 0.4;
      glowLightRef.current.intensity = pulse;
    }
  });

  return (
    <group
      ref={meshRef}
      position={[0.25, 0.12, 0.4]}
      onClick={(e) => {
        e.stopPropagation();
        onTriggerTap();
      }}
    >
      {/* Brass Outer Bevel Edge */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.44, 0.46, 0.08, 48]} />
        <meshStandardMaterial
          color={active ? '#FFD479' : '#D9AD68'}
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* Rich Espresso Walnut Wooden Inlay */}
      <mesh position={[0, 0.085, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 48]} />
        <meshStandardMaterial color="#2C1E18" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Engraved Brass Ring */}
      <mesh position={[0, 0.098, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.32, 48]} />
        <meshBasicMaterial color={active ? '#FFF5D9' : '#D9AD68'} />
      </mesh>

      {/* Center NFC Wave Symbol */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.07, 24]} />
        <meshBasicMaterial color={active ? '#FFFFFF' : '#D9AD68'} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.11, 0.13, 24, 1, 0, Math.PI * 1.2]} />
        <meshBasicMaterial color={active ? '#FFFFFF' : '#D9AD68'} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.17, 0.19, 24, 1, 0, Math.PI * 1.2]} />
        <meshBasicMaterial color={active ? '#FFFFFF' : '#D9AD68'} />
      </mesh>

      {/* Soft Glow Point Light */}
      <pointLight
        ref={glowLightRef}
        color={active ? '#FFE29A' : '#D9AD68'}
        intensity={active ? 3.0 : 0.8}
        distance={2.2}
      />

      {/* Interactive Tooltip / Label */}
      <Html position={[0, 0.28, 0]} center distanceFactor={7}>
        <button
          onClick={onTriggerTap}
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider flex items-center gap-1.5 whitespace-nowrap shadow-xl transition-all duration-300 ${
            active
              ? 'bg-[#D9AD68] text-[#171310] scale-110 ring-4 ring-[#D9AD68]/40'
              : 'bg-[#201A16]/90 text-[#FAF5ED] border border-[#D9AD68]/40 hover:border-[#D9AD68] hover:scale-105'
          }`}
        >
          <Wifi className={`w-3 h-3 ${active ? 'animate-ping' : 'text-[#D9AD68]'}`} />
          <span>{active ? 'NFC CONNECTED' : 'TAP HERE'}</span>
        </button>
      </Html>
    </group>
  );
}

/* --- SMARTPHONE DISPLAYING DIGITAL MENU --- */
function SmartphoneScene({ active, tableNumber }: { active: boolean; tableNumber: string }) {
  const phoneGroup = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);

  useFrame((_state, delta) => {
    if (!phoneGroup.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;
    if (active) {
      // Gentle floating lift on tap
      phoneGroup.current.position.y = THREE.MathUtils.lerp(
        phoneGroup.current.position.y,
        0.26 + Math.sin(t * 6) * 0.02,
        delta * 6
      );
      phoneGroup.current.rotation.z = THREE.MathUtils.lerp(phoneGroup.current.rotation.z, -0.04, delta * 6);
    } else {
      phoneGroup.current.position.y = THREE.MathUtils.lerp(phoneGroup.current.position.y, 0.14, delta * 4);
      phoneGroup.current.rotation.z = THREE.MathUtils.lerp(phoneGroup.current.rotation.z, -0.08, delta * 4);
    }
  });

  return (
    <group ref={phoneGroup} position={[1.1, 0.14, 0.35]} rotation={[0, -0.22, -0.08]}>
      {/* Phone Titanium Chassis */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.06, 1.35]} />
        <meshStandardMaterial color="#22201E" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Phone Screen Bezel */}
      <mesh position={[0, 0.082, 0]}>
        <boxGeometry args={[0.66, 0.005, 1.3]} />
        <meshStandardMaterial color="#0E0C0A" roughness={0.1} />
      </mesh>

      {/* Screen Interface via 3D Html */}
      <Html
        position={[0, 0.088, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        transform
        distanceFactor={2.4}
      >
        <div className="w-[180px] h-[350px] bg-[#171310] text-[#FAF5ED] rounded-[24px] p-3 shadow-2xl border border-[#D9AD68]/30 flex flex-col justify-between overflow-hidden select-none pointer-events-none">
          {/* Status bar */}
          <div className="flex items-center justify-between text-[8px] text-[#C4BCAC] border-b border-[#FAF5ED]/10 pb-1.5">
            <span className="font-semibold text-[#D9AD68]">TAP & BREW</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E83]"></span>
              <span>5G</span>
            </div>
          </div>

          {/* Table active banner */}
          <div className="my-1.5 bg-[#2C1E18] rounded-xl p-2 border border-[#C88D56]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[7px] text-[#D9AD68] uppercase font-bold tracking-wider">Active Table</p>
                <p className="text-[11px] font-bold text-[#FAF5ED]">{tableNumber}</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#C88D56]/20 flex items-center justify-center text-[#D9AD68]">
                {active ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Wifi className="w-3.5 h-3.5 animate-pulse" />}
              </div>
            </div>
          </div>

          {/* Mini preview card */}
          <div className="space-y-1.5 flex-1">
            <p className="text-[8px] text-[#C4BCAC] font-medium">Popular Now</p>
            <div className="bg-[#201A16] p-1.5 rounded-lg flex items-center gap-2 border border-[#FAF5ED]/5">
              <div className="w-8 h-8 rounded-md bg-[#3D2B22] flex items-center justify-center text-[10px]">☕</div>
              <div className="flex-1">
                <p className="text-[9px] font-semibold text-[#FAF5ED]">Caramel Cloud Latte</p>
                <p className="text-[8px] text-[#D9AD68] font-bold">₹240</p>
              </div>
            </div>

            <div className="bg-[#201A16] p-1.5 rounded-lg flex items-center gap-2 border border-[#FAF5ED]/5">
              <div className="w-8 h-8 rounded-md bg-[#3D2B22] flex items-center justify-center text-[10px]">🥐</div>
              <div className="flex-1">
                <p className="text-[9px] font-semibold text-[#FAF5ED]">Butter Croissant</p>
                <p className="text-[8px] text-[#D9AD68] font-bold">₹130</p>
              </div>
            </div>
          </div>

          {/* Bottom NFC status */}
          <div className={`mt-2 py-1 px-2 rounded-lg text-center transition-colors duration-300 ${
            active ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300' : 'bg-[#D9AD68]/10 text-[#D9AD68]'
          }`}>
            <p className="text-[8px] font-semibold flex items-center justify-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {active ? 'NFC Synchronized' : 'Tap table tag to browse'}
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
}

/* --- CAFÉ TABLETOP --- */
function CafeTable() {
  return (
    <group position={[0, -0.05, 0]}>
      {/* Tabletop Surface */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 2.8, 0.16, 64]} />
        <meshStandardMaterial
          color="#38261D"
          roughness={0.6}
          metalness={0.08}
        />
      </mesh>

      {/* Brass Edge Trim */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[2.8, 0.025, 16, 64]} />
        <meshStandardMaterial color="#D9AD68" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Cast Iron Table Pedestal */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 1.6, 24]} />
        <meshStandardMaterial color="#171310" roughness={0.8} metalness={0.4} />
      </mesh>
    </group>
  );
}

/* --- MINIATURE CAFÉ BACKGROUND --- */
function CafeBackground() {
  return (
    <group position={[0, 0.8, -3.2]}>
      {/* Espresso Counter */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[7.5, 1.8, 1.2]} />
        <meshStandardMaterial color="#241B16" roughness={0.7} />
      </mesh>
      {/* White Marble Countertop */}
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[7.8, 0.08, 1.4]} />
        <meshStandardMaterial color="#E8E4DC" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Espresso Machine (Miniature) */}
      <group position={[-1.2, 1.35, 0]}>
        {/* Machine Body */}
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.8, 0.9]} />
          <meshStandardMaterial color="#1E1916" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Chrome Top Plate */}
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[1.64, 0.04, 0.92]} />
          <meshStandardMaterial color="#ECECEC" roughness={0.1} metalness={0.95} />
        </mesh>
        {/* Dual Group Heads */}
        <mesh position={[-0.35, -0.15, 0.48]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#ECECEC" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0.35, -0.15, 0.48]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#ECECEC" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Steam Wand */}
        <mesh position={[0.7, -0.1, 0.48]} rotation={[0.3, 0, 0.4]}>
          <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
          <meshStandardMaterial color="#ECECEC" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Coffee Bean Canisters */}
      {[-0.2, 0.3, 0.8, 1.3].map((x, idx) => (
        <mesh key={idx} position={[x, 1.2, 0.1]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.45, 16]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#C88D56' : '#2C1E18'}
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Pendant Lights with Soft Glow */}
      {[-1.6, 0, 1.6].map((x, idx) => (
        <group key={idx} position={[x, 2.4, 1.2]}>
          {/* Wire */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1.2, 8]} />
            <meshStandardMaterial color="#0A0807" />
          </mesh>
          {/* Brass Cone Shade */}
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[0.32, 0.38, 24, 1, true]} />
            <meshStandardMaterial color="#D9AD68" metalness={0.8} roughness={0.25} side={THREE.DoubleSide} />
          </mesh>
          {/* Bulb with warm point light */}
          <mesh position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#FFEBBA" />
          </mesh>
          <pointLight color="#FFDFAD" intensity={1.4} distance={3.8} />
        </group>
      ))}
    </group>
  );
}

/* --- WEBGL ERROR BOUNDARY --- */
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGlErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('WebGL Error caught by boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/* --- MAIN 3D SCENE COMPONENT --- */
export const Hero3DScene: React.FC = () => {
  const { nfcScanActive, triggerNfcTapSequence, tableNumber } = useCart();
  const [hasWebGlError, setHasWebGlError] = useState(false);

  const fallbackCard = (
    <div className="relative w-full h-[340px] xs:h-[380px] sm:h-[460px] lg:h-[540px] rounded-3xl bg-gradient-to-br from-[#2C1E18] to-[#171310] border border-[#D9AD68]/30 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-2xl">
      <div className="w-16 h-16 rounded-full bg-[#D9AD68]/20 flex items-center justify-center text-[#D9AD68] mb-4 border border-[#D9AD68]/40 animate-pulse">
        <Wifi className="w-8 h-8" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#FAF5ED] mb-2 font-heading">Smart NFC Table Ordering</h3>
      <p className="text-xs sm:text-sm text-[#C4BCAC] max-w-md mb-6">
        Seated at <span className="text-[#D9AD68] font-bold">{tableNumber}</span>. Tap your phone against the table tag or simulate below.
      </p>
      <button
        onClick={triggerNfcTapSequence}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D9AD68] to-[#C88D56] text-[#171310] font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        Experience NFC Tap
      </button>
    </div>
  );

  if (hasWebGlError) {
    return fallbackCard;
  }

  return (
    <WebGlErrorBoundary fallback={fallbackCard}>
      <div className="relative w-full h-[340px] xs:h-[380px] sm:h-[460px] lg:h-[540px] rounded-3xl overflow-hidden glass-panel border border-[#D9AD68]/25 shadow-2xl group touch-pan-y">
        {/* 3D Canvas with performance settings */}
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 1.5]}
          gl={{
            powerPreference: 'high-performance',
            antialias: true,
            alpha: true,
          }}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 2.8, 4.6], fov: 42 }}
          onError={() => setHasWebGlError(true)}
          className="cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Ambient & Directional Lighting */}
          <ambientLight intensity={0.65} color="#FFF5EA" />
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.2}
            color="#FFE9CC"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-3, 3, -1]} intensity={0.8} color="#D9AD68" />
          <pointLight position={[3, 2, 2]} intensity={0.9} color="#FAF5ED" />

          {/* Café Elements */}
          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.1}>
            <group position={[0, -0.2, 0]}>
              <CafeTable />
              <CoffeeCup />
              <PottedPlant />
              <WaterGlass />
              <NfcDisc active={nfcScanActive} onTriggerTap={triggerNfcTapSequence} />
              <SmartphoneScene active={nfcScanActive} tableNumber={tableNumber} />
              <WirelessWaves active={nfcScanActive} />
            </group>
          </Float>

          <CafeBackground />

          {/* Orbit Controls with constrained angles & single-touch passthrough */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4.2}
            maxPolarAngle={Math.PI / 2.3}
            minAzimuthAngle={-Math.PI / 5}
            maxAzimuthAngle={Math.PI / 5}
            dampingFactor={0.05}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN,
            }}
          />
        </Canvas>

        {/* Floating 3D Control Hints & Trigger Overlay */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full glass-panel-subtle text-[11px] font-medium text-[#FAF5ED] flex items-center gap-2 border border-[#D9AD68]/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#8F9E83] animate-pulse"></span>
            <span>Interactive 3D Tabletop</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1.5 rounded-full glass-panel-subtle text-[11px] font-semibold text-[#D9AD68] border border-[#D9AD68]/30">
            {tableNumber}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-[#D9AD68]/30 shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2C1E18] border border-[#D9AD68]/40 flex items-center justify-center text-[#D9AD68]">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#FAF5ED]">NFC Tabletop Tag</p>
              <p className="text-[10px] text-[#C4BCAC]">Click the brass disc or tap button</p>
            </div>
          </div>

          <button
            onClick={triggerNfcTapSequence}
            disabled={nfcScanActive}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer ${
              nfcScanActive
                ? 'bg-emerald-500 text-[#171310] ring-4 ring-emerald-500/30'
                : 'bg-gradient-to-r from-[#D9AD68] via-[#C88D56] to-[#B9684A] text-[#171310] hover:scale-105 active:scale-95 shadow-[#C88D56]/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{nfcScanActive ? 'Tag Connected!' : 'Experience NFC Tap'}</span>
          </button>
        </div>
      </div>
    </WebGlErrorBoundary>
  );
};

export default Hero3DScene;

