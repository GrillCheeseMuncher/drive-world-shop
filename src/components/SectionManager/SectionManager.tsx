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
  isDesc: boolean;
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
      'images/790 Renn.png',
      'images/Aerial R.png',
      'images/Aerial.png',
      'images/Aero GT RS.png',
      'images/Aero LC.png',
      'images/AeroLT.png',
      'images/AeroOne GTR.png',
      'images/Agent.png',
      "images/Agent 'Spy'.png",
      'images/Akuma Rally.png',
      'images/Allegro Evo.png',
      'images/Allegro GT.png',
      'images/Amazon Van.png',
      'images/Altus 441 GTE.png',
      'images/Altus 441 RS.png',
      'images/Apex GTR.png',
      'images/Apex S4 RS.png',
      'images/Apex Xtreme.png',
      'images/Arcane Evo.png',
      'images/Ardente GTR.png',
      'images/Augusta.png',
      'images/Avenger 7400.png',
      'images/B-127 Bumblebee.png',
      'images/Badger.png',
      'images/Bananamobile.png',
      'images/Bavette.png',
      'images/Bavette Evo.png',
      'images/Blade Evo.png',
      'images/Blade.png',
      'images/Blackbird.png',
      'images/Blip GT.png',
      'images/BloxOne.png',
      'images/Bloxymobile.png',
      'images/Boatmobile.png',
      'images/Bruiser.png',
      'images/Buck Rally.png',
      'images/Buggy.png',
      'images/Bullet.png',
      'images/Bullet GTR.png',
      'images/Bullshark Evo.png',
      'images/Butler Roadster.png',
      'images/Buzzard.png',
      'images/Camo Freedom.png',
      'images/Camo Stock.png',
      'images/Casper TRC.png',
      'images/Castellion.png',
      'images/Century X.png',
      'images/Chicane.png',
      'images/Cirrus 441 Rally.png',
      'images/Coach.png',
      'images/Coiler.png',
      'images/Comet E-X.png',
      'images/Condor Xtreme.png',
      'images/Contender 6x6.png',
      'images/Contender HT.png',
      'images/Corsair.png',
      'images/Costello RT.png',
      'images/Crescendo.png',
      'images/Crest.png',
      'images/Current.png',
      'images/Cutter Xtreme.png',
      'images/Cybersleigh.png',
      'images/Cybervolo.png',
      'images/D-16.png',
      'images/Dallara DW12.png',
      'images/Diavolo Evo.png',
      'images/Diavolo.png',
      'images/DragPal.png',
      'images/Drag Particle.png',
      'images/Drag Pheonix.png',
      'images/Drag Ranger.png',
      'images/Edler.png',
      'images/Edler Evo.png',
      'images/Emperor.png',
      'images/Epsilon Baron.png',
      'images/Epsilon Roadster.png',
      'images/Femaris Widebody.png',
      'images/Fleetway.png',
      'images/Fury.png',
      'images/Future Roadster.png',
      'images/Future Volition.png',
      'images/Galano.png',
      'images/Goliath.png',
      'images/Grant.png',
      'images/Gridiron.png',
      'images/Halcyon.png',
      'images/Hammer A1.png',
      'images/Hammer EV 6x6.png',
      'images/Hammer Rally.png',
      'images/Haroku Xtreme.png',
      'images/Hellion.png',
      'images/Holiday Inferno.png',
      'images/Holiday Kar.png',
      'images/Hooligan.png',
      'images/Hooligan Beast.png',
      'images/Hooligan Cyber.png',
      'images/Hooligan Nimbus.png',
      'images/Horizon Casanova.png',
      'images/Horizon Xtreme.png',
      'images/Hyperlance CD3.png',
      'images/HyperOne Evo.png',
      'images/Inferno.png',
      "images/Innovation '37.png",
      "images/Innovation '37 Xtreme.png",
      'images/Insect Hubert.png',
      'images/Jackrabbit.png',
      'images/Jaeger Evo.png',
      'images/Jupiter GTR.png',
      'images/K.I.T.E.png',
      'images/Kar.png',
      'images/Kingfisher.png',
      'images/Knight.png',
      'images/Kronos Mason.png',
      'images/LMP24.png',
      'images/LRC Xtreme.png',
      'images/Luxor.png',
      'images/Mako Evo.png',
      'images/Megabus.png',
      'images/Meteor.png',
      'images/Mixture.png',
      "images/Mixture 'Classic'.png",
      'images/Modena.png',
      'images/Mori15 Xtreme.png',
      'images/Nexus 2.png',
      'images/Nexus Xtreme.png',
      'images/Nightline S34.png',
      'images/Nightline S34 Xtreme.png',
      'images/Nightline S35 Xtreme.png',
      'images/Nightline S36R.png',
      'images/Nimbus 791 Evo.png',
      'images/Ocelot Evo.png',
      'images/Odin 6x6.png',
      'images/Orion Pax.png',
      'images/Osiris.png',
      'images/Phoenix.png',
      'images/Pioneer Rally.png',
      'images/Pioneer Summit.png',
      'images/Present Pal.png',
      'images/Prince.png',
      'images/Project Rasant.png',
      'images/Proton Wagon.png',
      'images/Pumpkin Pal.png',
      'images/Quicksilver.png',
      "images/Quicksilver 'Time Machine'.png",
      'images/Quinten Rally.png',
      'images/R400BC.png',
      'images/Race Pal.png',
      'images/Rally Hunter.png',
      'images/Rally RS.png',
      'images/Rasant Black.png',
      'images/Rat Rod.png',
      'images/Razor 2 Xtreme.png',
      'images/Razor Retro Evo.png',
      'images/Razor UTE Evo.png',
      'images/Razor Xtreme.png',
      'images/Regent.png',
      'images/RFX.png',
      'images/Roadster 1 Evo.png',
      'images/Roadster Spyder.png',
      'images/Rogue S.png',
      'images/Rosso Widebody.png',
      'images/Rotary Evo.png',
      "images/'Rotary Evo'.png",
      'images/Rotary Xtreme.png',
      'images/Santabus.png',
      'images/Saxxon.png',
      'images/Scimitar Evo.png',
      'images/Scimitar.png',
      'images/Serpent.png',
      'images/Sideswipe RT.png',
      'images/Sideswipe X.png',
      'images/Sidewinder.png',
      'images/Sierra12 Evo.png',
      'images/Silvio Evo.png',
      'images/Silverstone.png',
      'images/Solace.png',
      'images/Solar Xtreme.png',
      'images/Stallion Beast.png',
      'images/Stallion Cabriolet.png',
      'images/Stallion M Race.png',
      'images/Stinger.png',
      'images/Stinger GTR.png',
      'images/Street Eagle.png',
      'images/Stratus ST4 RS.png',
      'images/Summit Beast.png',
      'images/Super4 Xtreme.png',
      'images/Super5 Xtreme.png',
      'images/Tesoro.png',
      'images/The Coffin.png',
      'images/The Patriot.png',
      'images/Tiger1.png',
      'images/Torakku Xtreme.png',
      'images/Trek 390.png',
      'images/Trident Victory.png',
      'images/Trident.png',
      'images/Trex Beast.png',
      'images/V10 RS Widebody.png',
      'images/Vande Widebody.png',
      'images/Vanguard.png',
      'images/Vern.png',
      'images/Verona Evo.png',
      'images/Viscount.png',
      'images/Vivec.png',
      'images/Vizier.png',
      'images/Vulture.png',
      'images/Vulture VT.png',
      'images/Wagen 6x6.png',
      'images/Widebody Carbon.png',
      'images/Widebody Comet.png',
      'images/Widebody Exotica.png',
      'images/Widow.png',
      'images/Widow Xtreme.png',
      'images/X60S.png',
      'images/Yasko.png',
      'images/Zenna GTR.png',
      'images/Zeus Evo.png',
      'images/ZeroOne Evo.png',
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
        isDesc: false,
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
      newSections[index].isReserv = false;
    }
    setSections(newSections);
  };

  const markAsReserved = (index: number) => {
    const newSections = [...sections];
    newSections[index].isReserv = !newSections[index].isReserv;
    if (newSections[index].isReserv) {
      newSections[index].isSold = false;
    }
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

  const getVisibleSections = () => {
    return sections;
  };

  const getInvisibleDivs = () => {
    const visibleSectionsCount = getVisibleSections().length;
    const invisibleDivs = [];

    if (visibleSectionsCount < 1) {
      for (let i = 0; i < 3; i++) {
        invisibleDivs.push(<div key={`invisible-${i}`} className="invisible-div"></div>);
      }
    } else if (visibleSectionsCount === 1) {
      for (let i = 0; i < 2; i++) {
        invisibleDivs.push(<div key={`invisible-${i}`} className="invisible-div"></div>);
      }
    } else if (visibleSectionsCount === 2) {
      invisibleDivs.push(<div key="invisible-1" className="invisible-div"></div>);
    }

    return invisibleDivs;
  };

  const formatNumberWithSuffix = (value: number): string => {
    const isNegative = value < 0;
    const absValue = Math.abs(value); // Work with the absolute value for formatting

    let formattedValue: string;
    if (absValue >= 1e9) {
      formattedValue = (absValue / 1e9).toFixed(0) + 'b'; // Billion
    } else if (absValue >= 1e6) {
      formattedValue = (absValue / 1e6).toFixed(0) + 'm'; // Million
    } else if (absValue >= 1e3) {
      formattedValue = (absValue / 1e3).toFixed(0) + 'k'; // Thousand
    } else {
      formattedValue = absValue.toFixed(0); // No suffix
    }

    return isNegative ? `-${formattedValue}` : formattedValue; // Add negative sign if needed
  };

  const calculateProfit = (buyPrice: string, sellPrice: string, count: number): string => {
    const parsePrice = (price: string): number => {
      let multiplier = 1;
      if (price.endsWith('k')) {
        multiplier = 1000;
        price = price.slice(0, -1);
      } else if (price.endsWith('m')) {
        multiplier = 1000000;
        price = price.slice(0, -1);
      } else if (price.endsWith('b')) {
        multiplier = 1000000000;
        price = price.slice(0, -1);
      }
      return parseFloat(price) * multiplier;
    };

    const buy = parsePrice(buyPrice);
    const sell = parsePrice(sellPrice) * count; // Multiply selling price by the count of cars
    const profit = Math.floor(sell * 0.9 - buy); // Subtract 10% from the selling price and then subtract the buy price
    return formatNumberWithSuffix(profit); // Format the profit with suffix
  };

  return (
    <>
      <div className="sections-grid">
        {sections.map((section, index) => (
          <div>
            <div
              key={index}
              className={`section-container ${index === 0 ? 'first-section' : ''} ${
                section.isSold || section.isReserv ? ' section-overlay' : ''
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

                  <div>
                    <label className="price-labels">Bought price:</label>
                    <input
                      type="text"
                      value={section.buyText}
                      onChange={(e) => handleBuyTextChange(e, index)}
                      placeholder="Buy price"
                      className="buy-price"
                    />
                  </div>
                  <div>
                    <label className="price-labels">Full selling price:</label>
                    <input
                      type="text"
                      value={formatNumberWithSuffix(parseFloat(section.customText) * section.count)} // Format full selling price
                      readOnly
                      placeholder="Sell price"
                      className="buy-price"
                    />
                  </div>
                  <div>
                    <label className="price-labels">Profit:</label>
                    <input
                      type="text"
                      value={calculateProfit(section.buyText, section.customText, section.count)} // Use the updated profit calculation
                      readOnly
                      className="buy-price"
                      placeholder="Profit"
                    />
                  </div>

                  <button className="sold-button" onClick={() => markAsSold(index)}>
                    {section.isSold ? 'Unmark as Sold' : 'Mark as Sold'}
                  </button>
                  <button className="reserved-button" onClick={() => markAsReserved(index)}>
                    {section.isReserv ? 'Unmark as Reserved' : 'Mark as Reserved'}
                  </button>
                  <button className="close-button" onClick={() => removeSection(index)}>
                    Remove
                  </button>
                </div>
              </div>
              {section.count > 1 && !section.isSold && !section.isReserv && (
                <div className="count-display">
                  <span className="count-display-spec">x{section.count}</span>
                </div>
              )}
              <label className="image-upload" onClick={() => openImageModal(index)}>
                {!section.image && <span className="plus-icon">+</span>}
                {section.image && (
                  <img src={section.image} alt="Uploaded" className="section-image" />
                )}
                {(section.selectedOption === 'FS' ||
                  section.selectedOption === 'FM' ||
                  section.selectedOption === 'PU') && (
                  <div className="right-bottom-corner">
                    {section.selectedOption === 'FS' && <div>FS</div>}
                    {section.selectedOption === 'FM' && <div>FM</div>}
                    {section.selectedOption === 'PU' && <div>PU</div>}
                  </div>
                )}
                <input
                  type="text"
                  value={section.text}
                  onChange={(e) => handleTextChange(e, index)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Car"
                  className="section-input name-input"
                  style={{
                    width: `${
                      section.text.length <= 10
                        ? Math.max(100, section.text.length * 18)
                        : section.text.length <= 15
                        ? Math.max(100, section.text.length * 16)
                        : Math.max(100, section.text.length * 15)
                    }px`,
                    transition: 'width 0.3s ease',
                  }}
                />
              </label>
              <div className="under-image-content">
                <input
                  type="text"
                  value={section.customText}
                  onChange={(e) => handleCustomTextChange(e, index)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Price"
                  className={`section-input price-input`}
                  style={{
                    width: `${
                      section.text.length <= 10
                        ? Math.max(100, section.customText.length * 18)
                        : section.text.length <= 15
                        ? Math.max(100, section.customText.length * 16)
                        : Math.max(100, section.customText.length * 14)
                    }px`,
                    transition: 'width 0.3s ease',
                  }}
                />
                <div className="dollar-indicator">$</div>
              </div>

              {section.isSold && !section.isReserv && (
                <div className="sold">
                  <div className="sold-overlay">SOLD</div>
                </div>
              )}

              {section.isReserv && !section.isSold && (
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
                {filteredImages.map((image, i) => {
                  const carName = image.split('/').pop()?.split('.')[0] || '';
                  return (
                    <div key={i} className="image-container" onClick={() => selectImage(image)}>
                      <img src={`/${image}`} alt="thumbnail" className="image-thumb" />
                      <div className="car-name">{carName}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {
          <div className="section-container add-section" onClick={addSection}>
            <div className="plus-icon">+</div>
          </div>
        }
        {getInvisibleDivs()}
      </div>
    </>
  );
};

export default SectionManager;
