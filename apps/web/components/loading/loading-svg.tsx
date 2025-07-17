'use client';

import React, { useState, useEffect } from 'react';

interface DotProps {
  position: number; // 1, 2, 3번째 점
  isJumping: boolean;
}

// px를 SVG 좌표계로 변환하는 함수
const pxToSvg = (px: number) => {
  const svgHeight = 73; // viewBox height
  const actualHeight = 73; // 실제 SVG 높이 (px)
  return (px / actualHeight) * svgHeight;
};

function Dot({ position, isJumping }: DotProps) {
  const getX = () => {
    const dotSize = 12;
    const spacing = 12;
    const startX = 10;
    switch (position) {
      case 1:
        return pxToSvg(startX);
      case 2:
        return pxToSvg(startX + dotSize + spacing);
      case 3:
        return pxToSvg(startX + (dotSize + spacing) * 2);
      default:
        return pxToSvg(startX);
    }
  };

  const getY = () => {
    const baseY = 30; // 기본 Y 위치

    if (isJumping) {
      return pxToSvg(baseY - 16); // 16px 위로 점프
    }
    return pxToSvg(baseY); // 기본 위치
  };

  // 점 크기: 12x12px
  const dotRadius = pxToSvg(6); // 반지름 6px

  return (
    <circle
      cx={getX()}
      cy={getY()}
      r={dotRadius}
      fill="#FF488F"
      className="transition-all duration-150 ease-linear"
    />
  );
}

function Airplane({ isJumping }: { isJumping: boolean }) {
  const getAirplaneY = () => {
    // 비행기는 항상 아래에 있는 점(점프하지 않은 점)보다 4픽셀 아래에 위치
    const baseY = 30; // 기본 점 위치 (px)
    const offset = 4; // 비행기 오프셋 (px)
    return pxToSvg(baseY + offset); // 34px를 SVG 좌표계로 변환
  };

  return (
    <path
      d="M144.847 45.3083C144.239 42.8686 140.129 41.2171 137.92 40.6135C134.552 39.6927 131.669 40.3037 128.289 40.4408C125.449 40.5563 122.598 40.573 119.765 40.751L106.933 25.0587C105.983 24.1944 104.855 23.5634 103.55 23.4094C102.443 23.2789 99.3217 23.1957 98.2866 23.3724C96.7674 23.6313 96.8999 25.0262 97.4284 26.1642L103.489 41.5845L88.0833 42.3596C87.8962 42.3576 87.8012 42.2145 87.6761 42.131C86.3495 41.2421 84.4087 38.6327 83.1321 37.4251C82.5814 36.9041 81.7975 36.1604 81.0397 36.062C79.4702 35.8584 77.5008 35.7962 75.9904 36.2861C74.8552 36.6539 75.1484 37.7146 75.5154 38.696C76.9643 42.5689 78.7732 46.3483 80.2438 50.2182C80.9776 51.5742 82.8564 51.0822 84.1623 51.1853C99.989 52.4325 116.215 52.7793 132.046 52.1473C136.014 51.9886 146.404 51.5583 144.847 45.3083Z"
      fill="#FFDFEC"
      className="transition-all duration-150 ease-linear"
      style={{
        transform: `translate(${isJumping ? 4 : 0}px, ${getAirplaneY() - 45.3083}px)`,
      }}
    />
  );
}

export default function LoadingSvg() {
  const [currentView, setCurrentView] = useState(1);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentView((prev) => {
          const next = prev === 4 ? 1 : prev + 1;
          return next;
        });
      },
      currentView === 4 ? 800 : 150
    ); // view 4 -> view 1일 때만 800ms

    return () => clearInterval(interval);
  }, [currentView]);

  return (
    <div className="flex items-center justify-center">
      <svg
        width="170"
        height="73"
        viewBox="0 0 154 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 첫 번째 점 */}
        <Dot position={1} isJumping={currentView === 1} />

        {/* 두 번째 점 */}
        <Dot position={2} isJumping={currentView === 2} />

        {/* 세 번째 점 */}
        <Dot position={3} isJumping={currentView === 3} />

        {/* 비행기 */}
        <Airplane isJumping={currentView === 3} />
      </svg>
    </div>
  );
}
