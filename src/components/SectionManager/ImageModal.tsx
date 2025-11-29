import React from 'react';
import './ImageModal.scss';

interface ImageModalProps {
  images: string[];
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectImage: (image: string) => void;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  searchTerm,
  handleSearchChange,
  selectImage,
  closeModal,
}) => {
  return (
    <div className="image-modal">
      <div className="modal-content">
        <div className="modal-search-container">
          <input
            type="text"
            placeholder="Search for images..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button onClick={closeModal} className="close-modal">
            Close
          </button>
        </div>
        <div className="image-grid">
          {images.map((image, i) => {
            const carName = image.split('/').pop()?.split('.')[0] || '';
            const cleanedCarName =
              carName === "'Rotary Evo'"
                ? '"Rotary Evo"'
                : carName === "Insect 'Hubert'"
                ? 'Insect "Hubert"'
                : carName === "B-127 'Bumblebee'"
                ? 'B-127 "Bumblebee"'
                : carName === "D-16 'Megatron'"
                ? 'D-16 "Megatron"'
                : carName === "Elita-1 'Elita'"
                ? 'Elita-1 "Elita"'
                : carName === "Nightline S35 'Fury'"
                ? 'Nightline S35 "Fury"'
                : carName === "Orion Pax 'Optimus Prime'"
                ? 'Orion Pax "Optimus Prime"'
                : carName === 'KITE'
                ? 'K.I.T.E'
                : carName === "LUX 800 'Morikawa'"
                ? 'LUX 800 "Morikawa"'
                : carName === "Camo 'Medal Edition'"
                ? 'Camo "Medal Edition"'
                : carName === "Camo 'elf Edition'"
                ? 'Camo "e.l.f. Edition"'
                : carName;

            return (
              <div key={i} className="image-container" onClick={() => selectImage(image)}>
                <img src={`/${image}`} alt="thumbnail" className="image-thumb" />
                <div className="car-name">{cleanedCarName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
