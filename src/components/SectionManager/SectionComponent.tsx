import React from 'react';
import { Section } from './SectionManager';
import Menu from './Menu';
import Overlay from './Overlay';
import './SectionComponent.scss';

interface SectionProps {
  section: Section;
  index: number;
  markAsSold: (index: number) => void;
  markAsReserved: (index: number) => void;
  markAsTV: (index: number) => void;
  removeSection: (index: number) => void;
  handleCountChange: (index: number, newCount: number) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleCustomTextChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  openImageModal: (index: number) => void;
  handleOptionSelect: (index: number, option: string) => void;
  handleSerialChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const SectionComponent: React.FC<SectionProps> = ({
  section,
  index,
  markAsSold,
  markAsReserved,
  markAsTV,
  removeSection,
  handleCountChange,
  handleTextChange,
  handleCustomTextChange,
  openImageModal,
  handleOptionSelect,
  handleSerialChange,
}) => {
  return (
    <div
      className={`section-container ${section.isSold || section.isReserv ? 'section-overlay' : ''}`}
    >
      <div className="up-container">
        <Menu
          index={index}
          section={section}
          markAsSold={markAsSold}
          markAsReserved={markAsReserved}
          markAsTV={markAsTV}
          removeSection={removeSection}
          handleCountChange={handleCountChange}
          handleOptionSelect={handleOptionSelect}
        />
        {(section.selectedOption === 'FS' ||
          section.selectedOption === 'FM' ||
          section.selectedOption === 'PU') && (
          <div className="right-bottom-corner">
            {section.selectedOption === 'FS' && <span>FS</span>}
            {section.selectedOption === 'FM' && <span>FM</span>}
            {section.selectedOption === 'PU' && <span>PU</span>}
          </div>
        )}
        <label className="image-upload" onClick={() => openImageModal(index)}>
          {!section.image && <span className="plus-icon">+</span>}
          {section.image && <img src={section.image} alt="Uploaded" className="section-image" />}
          {section.count > 1 && !section.isSold && !section.isReserv && (
            <div className="count-display">
              <span>x{section.count}</span>
            </div>
          )}
          {(section.text === 'Epsilon Roadster' ||
            section.text === 'Verona Evo' ||
            section.text === 'Widow' ||
            section.text === 'Corsair' ||
            section.text === 'Sidewinder') && (
            <input
              type="text"
              placeholder="Serial"
              className="serial-number-input section-input"
              onChange={(e) => handleSerialChange(e, index)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <span className="section-input name-input">{section.text || 'Car'}</span>
        </label>
      </div>

      {!section.isTV && (
        <div className="under-image-content">
          <div className="dollar cash-indicator">$</div>
          <input
            type="text"
            value={section.customText}
            onChange={(e) => handleCustomTextChange(e, index)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Price"
            className={`section-input price-input`}
          />
        </div>
      )}
      {section.isTV && (
        <div className="under-image-content">
          <div className="value-container">
            <div className="dollar value-indicator">$</div>
            <input
              type="text"
              value={section.customText}
              onChange={(e) => handleCustomTextChange(e, index)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Price"
              className={`section-input price-input`}
            />
          </div>
          <div className="value-container">
            <div className="tv value-indicator">TV</div>
            <input
              type="text"
              value={section.customText}
              onChange={(e) => handleCustomTextChange(e, index)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Price"
              className={`section-input price-input`}
            />
          </div>
        </div>
      )}

      <Overlay status={section.isSold ? 'sold' : section.isReserv ? 'reserved' : null} />
    </div>
  );
};

export default SectionComponent;
