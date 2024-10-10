import React, { useState, useEffect } from 'react';
import './Section.scss';

interface Section {
  image: string;
  text: string;
  customText: string;
  isSold: boolean;
  isOffsale: boolean;
  selectedOption: string;
  count: number;
}

const SectionManager: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);

  // Load sections from localStorage on component mount
  useEffect(() => {
    const savedSections = localStorage.getItem('sections');
    if (savedSections) {
      console.log('Loaded sections from localStorage:', JSON.parse(savedSections));
      setSections(JSON.parse(savedSections));
    }
  }, []);

  // Save sections to localStorage whenever sections array changes
  useEffect(() => {
    if (sections.length > 0) {
      console.log('Saving sections to localStorage:', sections);
      localStorage.setItem('sections', JSON.stringify(sections));
    }
  }, [sections]);

  // Add new section
  const addSection = () => {
    setSections([
      ...sections,
      {
        image: '',
        text: '',
        customText: '',
        isSold: false,
        isOffsale: false,
        selectedOption: '',
        count: 1,
      },
    ]);
  };

  // Remove a section
  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  // Toggle "Sold" status and unmark "Offsale" if marked
  const markAsSold = (index: number) => {
    const newSections = [...sections];
    newSections[index].isSold = !newSections[index].isSold;
    if (newSections[index].isSold) {
      newSections[index].isOffsale = false; // Unmark Offsale when marked as Sold
    }
    setSections(newSections);
  };

  // Toggle "Offsale" status and unmark "Sold" if marked
  const markAsOffsale = (index: number) => {
    const newSections = [...sections];
    newSections[index].isOffsale = !newSections[index].isOffsale;
    if (newSections[index].isOffsale) {
      newSections[index].isSold = false; // Unmark Sold when marked as Offsale
    }
    setSections(newSections);
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');

      const newSections = [...sections];
      newSections[index].image = URL.createObjectURL(file);
      newSections[index].text = fileNameWithoutExtension;

      setSections(newSections);
    }
  };

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].text = e.target.value;
    setSections(newSections);
  };

  // Handle custom text input change
  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].customText = e.target.value;
    setSections(newSections);
  };

  // Handle count change
  const handleCountChange = (index: number, newCount: number) => {
    const newSections = [...sections];
    newSections[index].count = newCount;
    setSections(newSections);
  };

  // Handle option selection
  const handleOptionSelect = (index: number, option: string) => {
    const newSections = [...sections];
    newSections[index].selectedOption = option;
    setSections(newSections);
  };

  return (
    <div className="sections-grid">
      {sections.map((section, index) => (
        <div key={index} className={`section-container`}>
          {/* Section content */}
          <div className="menu">
            <button className="menu-button">☰</button>

            <div className="menu-content">
              <button className="close-button" onClick={() => removeSection(index)}>
                Close
              </button>
              <button className="sold-button" onClick={() => markAsSold(index)}>
                {section.isSold ? 'Unmark as Sold' : 'Mark as Sold'}
              </button>
              <button className="offsale-button" onClick={() => markAsOffsale(index)}>
                {section.isOffsale ? 'Unmark as Offsale' : 'Mark as Offsale'}
              </button>

              <div className="count-controls">
                <button
                  onClick={() => {
                    if (section.count > 1) {
                      handleCountChange(index, section.count - 1);
                    }
                  }}
                  disabled={section.count <= 1}
                >
                  -
                </button>
                <span>{section.count}</span>
                <button onClick={() => handleCountChange(index, section.count + 1)}>+</button>
              </div>
            </div>
          </div>

          <label className="image-upload">
            {!section.image && <span className="plus-icon">+</span>}
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, index)} />
            {section.image && <img src={section.image} alt="Uploaded" className="section-image" />}
            {section.count > 1 && <div className="count-display">x{section.count}</div>}
            <input
              type="text"
              value={section.text}
              onChange={(e) => handleTextChange(e, index)}
              placeholder="Car"
              className="section-input"
              style={{
                width: `${Math.max(100, section.text.length * 15)}px`,
                transition: 'width 0.3s ease',
              }}
            />
          </label>

          <div className="price-input-container">
            <input
              type="text"
              value={section.customText}
              onChange={(e) => handleCustomTextChange(e, index)}
              placeholder="Price"
              className="section-input price-input"
              style={{
                width: `${Math.max(100, section.customText.length * 15)}px`,
                transition: 'width 0.3s ease',
              }}
            />

            <div className="option-buttons">
              {['PU', 'FM', 'FS'].map((option) => (
                <button
                  key={option}
                  className={`option-button ${section.selectedOption === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(index, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {section.isSold && !section.isOffsale && (
            <div className="sold">
              <div className="sold-overlay">SOLD</div>
            </div>
          )}

          {section.isOffsale && !section.isSold && (
            <div className="offsale">
              <div className="offsale-overlay">OFFSALE</div>
            </div>
          )}
        </div>
      ))}

      {/* Add the Add New Section button styled like a section */}
      <div className="section-container add-section" onClick={addSection}>
        <div className="plus-icon">+</div>
      </div>
    </div>
  );
};

export default SectionManager;
