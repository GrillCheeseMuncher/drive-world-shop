import React, { useState, useEffect } from 'react';
import './Section.scss';

interface Section {
  image: string;
  text: string;
  customText: string;
  isSold: boolean;
  selectedOption: string;
  count: number;
}

const SectionManager: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);

  // Load sections from localStorage on component mount
  useEffect(() => {
    const savedSections = localStorage.getItem('sections');
    if (savedSections) {
      console.log('Loaded sections from localStorage:', JSON.parse(savedSections)); // Debugging
      setSections(JSON.parse(savedSections));
    }
  }, []);

  // Save sections to localStorage whenever sections array changes
  useEffect(() => {
    if (sections.length > 0) {
      console.log('Saving sections to localStorage:', sections); // Debugging
      localStorage.setItem('sections', JSON.stringify(sections));
    }
  }, [sections]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        image: '',
        text: '',
        customText: '',
        isSold: false,
        selectedOption: '',
        count: 1,
      },
    ]);
  };

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const markAsSold = (index: number) => {
    const newSections = [...sections];
    newSections[index].isSold = !newSections[index].isSold;
    setSections(newSections);
  };

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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].text = e.target.value;
    setSections(newSections);
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].customText = e.target.value;
    setSections(newSections);
  };

  const handleCountChange = (index: number, newCount: number) => {
    const newSections = [...sections];
    newSections[index].count = newCount;
    setSections(newSections);
  };

  const handleOptionSelect = (index: number, option: string) => {
    const newSections = [...sections];
    newSections[index].selectedOption = option;
    setSections(newSections);
  };

  return (
    <div>
      <button className="add-section-button" onClick={addSection}>
        Add New Section
      </button>

      <div className="sections-grid">
        {sections.map((section, index) => (
          <div key={index} className={`section-container`}>
            <div className="menu">
              <button className="menu-button">☰</button>

              <div className="menu-content">
                <button className="close-button" onClick={() => removeSection(index)}>
                  Close
                </button>
                <button className="sold-button" onClick={() => markAsSold(index)}>
                  {section.isSold ? 'Unmark as Sold' : 'Mark as Sold'}
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
              {section.image && (
                <img src={section.image} alt="Uploaded" className="section-image" />
              )}

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
                    className={`option-button ${
                      section.selectedOption === option ? 'selected' : ''
                    }`}
                    onClick={() => handleOptionSelect(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {section.isSold && (
              <div className="sold">
                <div className="sold-overlay">SOLD</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionManager;
