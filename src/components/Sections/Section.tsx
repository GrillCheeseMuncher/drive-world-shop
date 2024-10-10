import React, { useState, useEffect } from 'react';
import './SectionManager.scss';

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null); // Track section for image selection
  const [imageList, setImageList] = useState<string[]>([]); // List of images
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  useEffect(() => {
    const images = [
      'images/390 Xtreme.png',
      'images/Akuma Rally.png',
      'images/Altus 441 RS.png',
      'images/Apex GTR.png',
      'images/Apex Xtreme.png',
      'images/Arcane Evo.png',
      'images/Ardente GTR.png',
      'images/Avenger 7400.png',
      'images/Badger.png',
      'images/Bavette.png',
      'images/Bavette Evo.png',
      'images/Blip GT.png',
      'images/BloxOne.png',
      'images/Bloxymobile.png',
      'images/Boatmobile.png',
      'images/Buck Rally.png',
      'images/Buggy.png',
      'images/Bullet.png',
      'images/Buzzard.png',
      'images/Camo Freedom.png',
      'images/Camo Stock.png',
      'images/Casper TRC.png',
      'images/Century X.png',
      'images/Coach.png',
      'images/Comet E-X.png',
      'images/Contender 6x6.png',
      'images/Contender HT.png',
      'images/Costello RT.png',
      'images/Crescendo.png',
      'images/Cutter Xtreme.png',
      'images/Cyclone GTRS.png',
      'images/D-16.png',
      'images/Dallara DW12.png',
      'images/Diavolo.png',
      'images/Diavolo Evo.png',
      'images/DragPal.png',
      'images/Drag Ranger.png',
      'images/Edler.png',
      'images/Epsilon Roadster.png',
      'images/Femaris Widebody.png',
      'images/Fury.png',
      'images/Future Volition.png',
      'images/Galano.png',
      'images/Grant.png',
      'images/Hammer EV 6x6.png',
      'images/Haroku Xtreme.png',
      'images/Hellion.png',
      'images/Hooligan.png',
      'images/Hooligan Beast.png',
      'images/Hooligan Cyber.png',
      'images/Hooligan Nimbus.png',
      'images/Horizon Casanova.png',
      'images/Horizon Xtreme.png',
      'images/Inferno.png',
      "images/Innovation '37.png",
      'images/Jupiter GTR.png',
      'images/Kar.png',
      'images/Kronos Mason.png',
      'images/LRC Xtreme.png',
      'images/Luxor.png',
      'images/Megabus.png',
      'images/Meteor.png',
      "images/Mixture 'Classic'.png",
      'images/Modena.png',
      'images/Mori15 Xtreme.png',
      'images/Nexus 2.png',
      'images/Nexus Xtreme.png',
      'images/Nightline S34 Xtreme.png',
      'images/Nightline S35 Xtreme.png',
      'images/Odin 6x6.png',
      'images/Orion Pax.png',
      'images/Present Pal.png',
      'images/Quicksilver.png',
      'images/Race Pal.png',
      'images/Rally Hunter.png',
      'images/Rally RS.png',
      'images/Rat Rod.png',
      'images/Razor 2 Xtreme.png',
      'images/Razor UTE Evo.png',
      'images/Razor Xtreme.png',
      'images/Regent.png',
      'images/Rosso Widebody.png',
      'images/Rotary Evo.png',
      'images/Rotary Xtreme.png',
      'images/Saxxon.png',
      'images/Scimitar.png',
      'images/Sideswipe RT.png',
      'images/Sideswipe X.png',
      'images/Sierra12 Evo.png',
      'images/Silvio Evo.png',
      'images/Solar Xtreme.png',
      'images/Stallion Cabriolet.png',
      'images/Stallion M Race.png',
      'images/Stinger.png',
      'images/Street Eagle.png',
      'images/Summit Beast.png',
      'images/Super4 Xtreme.png',
      'images/Super5 Xtreme.png',
      'images/The Patriot.png',
      'images/Tiger1.png',
      'images/Torakku Xtreme.png',
      'images/Trek 390.png',
      'images/Trex Beast.png',
      'images/V10 RS Widebody.png',
      'images/Vande Widebody.png',
      'images/Vern.png',
      'images/Viscount.png',
      'images/Wagen 6x6.png',
      'images/Zephyr Evo.png',
      'images/ZeroOne R.png',
      'images/Zeta Roadster.png',
      'images/Zoomer.png',
    ];
    setImageList(images);
  }, []);

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

  const openImageModal = (index: number) => {
    setSelectedSectionIndex(index);
    setIsModalOpen(true);
  };

  const selectImage = (image: string) => {
    if (selectedSectionIndex !== null) {
      const newSections = [...sections];
      newSections[selectedSectionIndex].image = image; // Use the selected image
      newSections[selectedSectionIndex].text = image.split('/').pop()?.split('.')[0] || ''; // Set the image name as the text

      setSections(newSections);
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = imageList.filter((image) =>
    image.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          <label className="image-upload" onClick={() => openImageModal(index)}>
            {!section.image && <span className="plus-icon">+</span>}
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

      {isModalOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <input
              type="text"
              placeholder="Search for images..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="image-grid">
              {filteredImages.map((image, i) => (
                <img
                  key={i}
                  src={`/${image}`}
                  alt="thumbnail"
                  className="image-thumb"
                  onClick={() => selectImage(image)}
                />
              ))}
            </div>
            <button onClick={() => setIsModalOpen(false)} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add the Add New Section button styled like a section */}
      <div className="section-container add-section" onClick={addSection}>
        <div className="plus-icon">+</div>
      </div>
    </div>
  );
};

export default SectionManager;
