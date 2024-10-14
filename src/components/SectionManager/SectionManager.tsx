import React, { useState, useEffect } from 'react';
import './SectionManager.scss';

export interface Section {
  id: number;
  image: string;
  text: string;
  customText: string;
  buyText: string;
  isSold: boolean;
  isReserv: boolean;
  isOffsale: boolean;
  isDesc: boolean;
  isOffer: boolean;
  selectedOption: string;
  count: number;
}

const SectionManager: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const savedSections = localStorage.getItem('sections');
    if (savedSections) {
      console.log('Loaded sections from localStorage:', JSON.parse(savedSections));
      setSections(JSON.parse(savedSections));
    }
  }, []);

  useEffect(() => {
    if (sections.length > 0) {
      console.log('Saving sections to localStorage:', sections);
      localStorage.setItem('sections', JSON.stringify(sections));
    }
  }, [sections]);

  useEffect(() => {
    const images = [
      'images/390 Xtreme.png',
      'images/Aero GT RS.png',
      'images/AeroOne GTR.png',
      'images/Akuma Rally.png',
      'images/Altus 441 RS.png',
      'images/Apex GTR.png',
      'images/Apex S4 RS.png',
      'images/Apex Xtreme.png',
      'images/Arcane Evo.png',
      'images/Ardente GTR.png',
      'images/Avenger 7400.png',
      'images/Augusta.png',
      'images/B-127 Bumblebee.png',
      'images/Badger.png',
      'images/Bavette.png',
      'images/Bavette Evo.png',
      'images/Blade.png',
      'images/Blip GT.png',
      'images/BloxOne.png',
      'images/Bloxymobile.png',
      'images/Boatmobile.png',
      'images/Buck Rally.png',
      'images/Buggy.png',
      'images/Butler Roadster.png',
      'images/Bullet.png',
      'images/Buzzard.png',
      'images/Camo Freedom.png',
      'images/Camo Stock.png',
      'images/Casper TRC.png',
      'images/Century X.png',
      'images/Cirrus 441 Rally.png',
      'images/Coach.png',
      'images/CyberVolo.png',
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
      'images/Future Roadster.png',
      'images/Future Volition.png',
      'images/Galano.png',
      'images/Grant.png',
      'images/Gridiron.png',
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
      'images/K.I.T.E.png',
      'images/Kar.png',
      'images/Kingfisher.png',
      'images/Kronos Mason.png',
      'images/LMP24.png',
      'images/LRC Xtreme.png',
      'images/Luxor.png',
      'images/Megabus.png',
      'images/Meteor.png',
      'images/Mixture.png',
      "images/Mixture 'Classic'.png",
      'images/Modena.png',
      'images/Mori15 Xtreme.png',
      'images/Nexus 2.png',
      'images/Nexus Xtreme.png',
      'images/Nightline S34 Xtreme.png',
      'images/Nightline S35 Xtreme.png',
      'images/Odin 6x6.png',
      'images/Osiris.png',
      'images/Orion Pax.png',
      'images/Present Pal.png',
      'images/Pumpkin Pal.png',
      'images/Quicksilver.png',
      'images/R400BC.png',
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
      'images/Scimitar Evo.png',
      'images/Sideswipe RT.png',
      'images/Sideswipe X.png',
      'images/Sierra12 Evo.png',
      'images/Silvio Evo.png',
      'images/Solar Xtreme.png',
      'images/Stallion Cabriolet.png',
      'images/Stallion M Race.png',
      'images/Stinger.png',
      'images/Street Eagle.png',
      'images/Stratus ST4 RS.png',
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
      'images/Vulture.png',
      'images/Wagen 6x6.png',
      'images/Widebody Carbon.png',
      'images/Widebody Comet.png',
      'images/Widebody Exotica.png',
      'images/Zeus Evo.png',
      'images/Zenna GTR.png',
      'images/X60S.png',
      'images/Yasko.png',
      'images/Zeta Roadster.png',
      'images/Zoomer.png',
    ];
    setImageList(images);
  }, []);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: 0,
        image: '',
        text: '',
        customText: '',
        buyText: '',
        isSold: false,
        isReserv: false,
        isOffsale: false,
        isDesc: false,
        isOffer: false,
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
    if (newSections[index].isSold) {
      newSections[index].isOffsale = false;
      newSections[index].isReserv = false;
    }
    setSections(newSections);
  };

  const markAsOffsale = (index: number) => {
    const newSections = [...sections];
    newSections[index].isOffsale = !newSections[index].isOffsale;
    if (newSections[index].isOffsale) {
      newSections[index].isSold = false;
      newSections[index].isReserv = false;
    }
    setSections(newSections);
  };

  const markAsReserved = (index: number) => {
    const newSections = [...sections];
    newSections[index].isReserv = !newSections[index].isReserv;
    if (newSections[index].isReserv) {
      newSections[index].isSold = false;
      newSections[index].isOffsale = false;
    }
    setSections(newSections);
  };

  const markAsOffer = (index: number) => {
    const newSections = [...sections];
    newSections[index].isOffer = !newSections[index].isOffer;
    setSections(newSections);
  };

  const openImageModal = (index: number) => {
    setSelectedSectionIndex(index);
    setIsModalOpen(true);
  };

  const selectImage = (image: string) => {
    if (selectedSectionIndex !== null) {
      const newSections = [...sections];
      newSections[selectedSectionIndex].image = image;
      newSections[selectedSectionIndex].text = image.split('/').pop()?.split('.')[0] || '';

      setSections(newSections);
      setIsModalOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = imageList.filter((image) =>
    image.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleBuyTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].buyText = e.target.value;
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
    <div className="sections-grid">
      {sections.map((section, index) => (
        <div>
          <div
            key={index}
            className={`section-container ${
              section.isSold || section.isOffsale || section.isReserv ? ' section-overlay' : ''
            }`}
          >
            <div className="menu">
              <button className="menu-button">☰</button>

              <div className="menu-content">
                <div className="count-controls">
                  <button
                    onClick={() => {
                      if (section.count > 1) {
                        handleCountChange(index, section.count - 1);
                      }
                    }}
                    disabled={section.count <= 1}
                    className="count-controls-button"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleCountChange(index, section.count + 1)}
                    className="count-controls-button"
                  >
                    +
                  </button>
                </div>

                <input
                  type="text"
                  value={section.buyText}
                  onChange={(e) => handleBuyTextChange(e, index)}
                  placeholder="Price"
                  className="buy-price"
                />

                <button className="sold-button" onClick={() => markAsSold(index)}>
                  {section.isSold ? 'Unmark as Sold' : 'Mark as Sold'}
                </button>
                <button className="reserved-button" onClick={() => markAsReserved(index)}>
                  {section.isSold ? 'Unmark as Reserved' : 'Mark as Reserved'}
                </button>
                <button className="offsale-button" onClick={() => markAsOffsale(index)}>
                  {section.isOffsale ? 'Unmark as Offsale' : 'Mark as Offsale'}
                </button>
                <button className="offer-button" onClick={() => markAsOffer(index)}>
                  {section.isOffer ? 'Unmark as Offer' : 'Mark as Offer'}
                </button>
                <button className="close-button" onClick={() => removeSection(index)}>
                  Close
                </button>
              </div>
            </div>

            <label className="image-upload" onClick={() => openImageModal(index)}>
              {!section.image && <span className="plus-icon">+</span>}
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
                  width: `${
                    section.text.length <= 15
                      ? Math.max(100, section.text.length * 16)
                      : Math.max(100, section.text.length * 14)
                  }px`,
                  transition: 'width 0.3s ease',
                }}
              />
            </label>

            <div className="price-input-container">
              {section.customText.length > 0 &&
                section.isOffer &&
                !section.isSold &&
                !section.isOffsale &&
                !section.isReserv && <div className="price-current-offer">Current Offer</div>}

              <input
                type="text"
                value={section.customText}
                onChange={(e) => handleCustomTextChange(e, index)}
                placeholder={`${section.isOffer ? 'Offer' : 'Price'}`}
                className={`section-input price-input ${section.isOffer ? 'price-offer' : ''}`}
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

            {section.isSold && !section.isOffsale && !section.isReserv && (
              <div className="sold">
                <div className="sold-overlay">SOLD</div>
              </div>
            )}

            {section.isOffsale && !section.isSold && !section.isReserv && (
              <div className="offsale">
                <div className="offsale-overlay">OFFSALE</div>
              </div>
            )}

            {section.isReserv && !section.isSold && !section.isOffsale && (
              <div className="reserved">
                <div className="reserved-overlay">RESERVED</div>
              </div>
            )}
          </div>
        </div>
      ))}

      {isModalOpen && (
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
              <button onClick={() => setIsModalOpen(false)} className="close-modal">
                Close
              </button>
            </div>
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
          </div>
        </div>
      )}

      <div className="section-container add-section" onClick={addSection}>
        <div className="plus-icon">+</div>
      </div>
    </div>
  );
};

export default SectionManager;
