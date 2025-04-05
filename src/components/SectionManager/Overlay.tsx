import React from 'react';
import './Overlay.scss';

interface OverlayProps {
  status: 'sold' | 'reserved' | null;
}

const Overlay: React.FC<OverlayProps> = ({ status }) => {
  if (!status) return null;

  return (
    <div className={status === 'sold' ? 'sold' : 'reserved'}>
      <div className={`${status}-overlay text-overlay`}>
        {status === 'sold' ? 'SOLD' : 'RESERVED'}
      </div>
    </div>
  );
};

export default Overlay;
