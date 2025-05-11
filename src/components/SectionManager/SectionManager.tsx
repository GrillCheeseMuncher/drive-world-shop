import React, { useState, useEffect, useRef } from 'react';
import SectionComponent from './SectionComponent';
import ImageModal from './ImageModal';
import './SectionManager.scss';
import ReactDOM from 'react-dom';

export interface Section {
  id: number;
  image: string;
  name: string;
  price: string;
  tvValue: string;
  isSold: boolean;
  isReserv: boolean;
  isTV: boolean;
  isDesc: boolean;
  selectedOption: string;
  count: number;
  serial: string;
}

const SectionManager: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(true);

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
      "images/Agent 'Spy'.png",
      "images/Innovation '37 Xtreme.png",
      "images/Innovation '37.png",
      "images/Mixture 'Classic'.png",
      "images/Quicksilver 'Time Machine'.png",
      'images/290 Boosted.png',
      'images/290 RST.png',
      'images/290 ST.png',
      'images/390 Renn.png',
      'images/390 Xtreme.png',
      'images/790 Renn.png',
      "images/'Rotary Evo'.png",
      'images/Ace.png',
      'images/Aerial R.png',
      'images/Aerial.png',
      'images/Aero GT RS.png',
      'images/Aero GT.png',
      'images/Aero LC.png',
      'images/AeroLT.png',
      'images/AeroOne GTR.png',
      'images/AeroOne.png',
      'images/Agent.png',
      'images/Akuma Rally.png',
      'images/Allegro Evo.png',
      'images/Allegro GT.png',
      'images/Altus 441 GTE.png',
      'images/Altus 441 RS.png',
      'images/Amazon Van.png',
      'images/Andromeda.png',
      'images/Apex GT.png',
      'images/Apex GTR.png',
      'images/Apex S4 Cabriolet.png',
      'images/Apex S4 RS.png',
      'images/Apex S4.png',
      'images/Apex Xtreme.png',
      'images/Arcane Evo.png',
      'images/Ardente GTR.png',
      'images/Ardente.png',
      'images/Augusta.png',
      'images/Avenger 3700.png',
      'images/Avenger 7400.png',
      "images/B-127 'Bumblebee'.png",
      'images/Badger.png',
      'images/Bananamobile.png',
      'images/Bastion.png',
      'images/Bavette Evo.png',
      'images/Bavette.png',
      'images/Beast.png',
      'images/Blackbird.png',
      'images/Blade Evo.png',
      'images/Blade.png',
      'images/Blip GT.png',
      'images/Blip JTI.png',
      'images/Blip R.png',
      'images/BloxOne.png',
      'images/Bloxymobile.png',
      'images/Boatmobile.png',
      'images/Bomber.png',
      'images/Bruiser.png',
      'images/Buck Rally.png',
      'images/Buck.png',
      'images/Buggy.png',
      'images/Bullet GTR.png',
      'images/Bullet.png',
      'images/Bullshark Evo.png',
      'images/Bullshark.png',
      'images/Butler Roadster.png',
      'images/Buzzard.png',
      'images/Camo Freedom.png',
      'images/Camo RS.png',
      'images/Camo Stock.png',
      'images/Camo.png',
      'images/Carbon RS.png',
      'images/Carbon.png',
      'images/Casper TRC.png',
      'images/Casper.png',
      'images/Castellion.png',
      'images/Cavallo Sporco.png',
      'images/Cavallo Trofeo.png',
      'images/Cavallo.png',
      'images/Century X.png',
      'images/Century.png',
      'images/Chicane.png',
      'images/Cirrus 441 Rally.png',
      'images/Civil.png',
      'images/Coach.png',
      'images/Coiler Xtreme.png',
      'images/Coiler.png',
      'images/Comet E-X.png',
      'images/Comet RS.png',
      'images/Comet.png',
      'images/Condor Xtreme.png',
      'images/Condor.png',
      'images/Contender 6x6.png',
      'images/Contender Fiend.png',
      'images/Contender HT.png',
      'images/Contender RT.png',
      'images/Contender.png',
      'images/Corsair.png',
      'images/Costello RT.png',
      'images/Crescendo.png',
      'images/Crest.png',
      'images/Crown.png',
      'images/Cruiser.png',
      'images/Current.png',
      'images/Cutter Xtreme.png',
      'images/Cutter.png',
      'images/Cyan.png',
      'images/Cyberpunk.png',
      'images/Cybersleigh.png',
      'images/Cybervolo.png',
      'images/Cyclone GT.png',
      'images/Cyclone GTRS.png',
      "images/D-16 'Megatron'.png",
      'images/Dallara DW12.png',
      'images/Diavolo Evo.png',
      'images/Diavolo.png',
      'images/Drag Particle.png',
      'images/Drag Pheonix.png',
      'images/Drag Ranger.png',
      'images/DragPal.png',
      'images/Edler Evo.png',
      'images/Edler Roadster.png',
      'images/Edler.png',
      "images/Elita-1 'Elita'.png",
      'images/Emperor.png',
      "images/Epsilon 'Baron'.png",
      'images/Epsilon Roadster.png',
      'images/Exotica.png',
      'images/Everon.png',
      'images/Falcon.png',
      'images/Femaris Widebody.png',
      'images/Fleetway.png',
      'images/Focal RS.png',
      'images/Frontier.png',
      'images/FULL-E.png',
      'images/Fury.png',
      'images/Future Roadster.png',
      'images/Future Volition.png',
      'images/Future.png',
      'images/Galano.png',
      'images/Gemini GTR.png',
      'images/Gemini.png',
      'images/Go Kart.png',
      'images/Goliath.png',
      'images/Grant.png',
      'images/Gridiron.png',
      'images/Halcyon.png',
      'images/Hammer A1.png',
      'images/Hammer EV 6x6.png',
      'images/Hammer EV.png',
      'images/Hammer Rally.png',
      'images/Haroku Xtreme.png',
      'images/Haroku.png',
      'images/Hellion.png',
      'images/Holiday Inferno.png',
      'images/Holiday Kar.png',
      'images/Hooligan Beast.png',
      'images/Hooligan Cyber.png',
      'images/Hooligan Nimbus.png',
      'images/Hooligan.png',
      'images/Horizon Casanova.png',
      'images/Horizon Xtreme.png',
      'images/Horizon.png',
      'images/Hypergalactic Humvee.png',
      'images/Hyperlance CD3.png',
      'images/HyperOne Evo.png',
      'images/HyperOne.png',
      'images/Inferno.png',
      "images/Insect 'Hubert'.png",
      'images/Insect.png',
      'images/Interceptor.png',
      'images/Jackrabbit.png',
      'images/Jaeger Evo.png',
      'images/Jupiter GTR.png',
      'images/K.I.T.E.png',
      'images/Kar.png',
      'images/Kingfisher.png',
      'images/Knight.png',
      'images/Kronos Mason.png',
      'images/Kronos.png',
      'images/LaRazza.png',
      'images/LMP24.png',
      'images/LRC Xtreme.png',
      'images/LRC.png',
      'images/LRXK.png',
      'images/Luxor.png',
      'images/Mako 900 Evo.png',
      'images/Mako Evo.png',
      'images/Malice.png',
      'images/Megabus.png',
      'images/MegaMamba.png',
      'images/Meteor.png',
      'images/Microbus.png',
      'images/Mixture.png',
      'images/Modena.png',
      'images/Mori15 Xtreme.png',
      'images/Mori15.png',
      'images/Nexus1.png',
      'images/Nexus 2.png',
      'images/Nexus Xtreme.png',
      'images/Nightline S34 Xtreme.png',
      'images/Nightline S34.png',
      'images/Nightline S35 Xtreme.png',
      'images/Nightline S35.png',
      'images/Nightline S36R.png',
      'images/Nimbus 791 Evo.png',
      'images/Nimbus 922 Evo.png',
      'images/Ocelot Evo.png',
      'images/Ocelot.png',
      'images/Odin 6x6.png',
      'images/Odin.png',
      "images/Orion Pax 'Optimus Prime'.png",
      'images/Osiris.png',
      'images/Pal.png',
      'images/Paleto Sport.png',
      'images/Particle.png',
      'images/Phoenix.png',
      'images/Pioneer Rally.png',
      'images/Pioneer Summit.png',
      'images/Pioneer.png',
      'images/Pony S5.png',
      'images/Present Pal.png',
      'images/Prince.png',
      'images/Project Rasant.png',
      'images/Project Strato.png',
      'images/Proton Wagon.png',
      'images/Pumpkin Pal.png',
      'images/Python GVR.png',
      'images/Quicksilver.png',
      'images/Quinten Rally.png',
      'images/Quinten.png',
      'images/R400.png',
      'images/R400BC.png',
      'images/R500.png',
      'images/Race Pal.png',
      'images/Rally Hunter.png',
      'images/Rally RS.png',
      'images/Ranger.png',
      'images/Rasant Black.png',
      'images/Rasant R.png',
      'images/Rat Rod.png',
      'images/Razor 2 Xtreme.png',
      'images/Razor Retro Evo.png',
      'images/Razor UTE Evo.png',
      'images/Razor Xtreme.png',
      'images/Razor.png',
      'images/Regent.png',
      'images/Requiem.png',
      'images/RFX.png',
      'images/Ringo.png',
      'images/Roadster 1 Evo.png',
      'images/Roadster 1.png',
      'images/Roadster Spyder.png',
      'images/Roadster.png',
      'images/Rogue S.png',
      'images/Rogue w.png',
      'images/Rosso Widebody.png',
      'images/Rosso.png',
      'images/Rotary Evo.png',
      'images/Rotary Xtreme.png',
      'images/Rotary.png',
      'images/Santabus.png',
      'images/Saxxon.png',
      'images/Scallop.png',
      'images/Scimitar Evo.png',
      'images/Scimitar.png',
      'images/Serpent.png',
      'images/Sideswipe RT.png',
      'images/Sideswipe X.png',
      'images/Sideswipe.png',
      'images/Sidewinder.png',
      'images/Sierra12 Evo.png',
      'images/Silverstone.png',
      'images/Silvio Evo.png',
      'images/Solace.png',
      'images/Solar Xtreme.png',
      'images/Solar.png',
      'images/Spark.png',
      'images/Specter Evo.png',
      'images/Specter.png',
      'images/Spectra.png',
      'images/Stallion350.png',
      'images/Stallion500.png',
      'images/Stallion Beast.png',
      'images/Stallion Cabriolet.png',
      'images/Stallion M Race.png',
      'images/Stallion M.png',
      'images/Stallion Patrol.png',
      'images/Stallion.png',
      'images/StarHunter.png',
      'images/Stinger GTR.png',
      'images/Stinger.png',
      'images/Stratus ST4 RS.png',
      'images/Stratus ST.png',
      'images/Stratus.png',
      'images/StreetEagle.png',
      'images/Summit Beast.png',
      'images/Super4 Xtreme.png',
      'images/Super4.png',
      'images/Super5 Xtreme.png',
      'images/Super5.png',
      'images/T90.png',
      'images/T90 Evo.png',
      'images/Tesoro.png',
      'images/The Coffin.png',
      'images/The Patriot.png',
      'images/Thunder.png',
      'images/Tiger1.png',
      'images/Tiger.png',
      'images/Torakku Xtreme.png',
      'images/Torakku.png',
      'images/Trek 390.png',
      'images/Trex Beast.png',
      'images/Trex.png',
      'images/Trident Victory.png',
      'images/Trident.png',
      'images/V10 LMS.png',
      'images/V10 RS Widebody.png',
      'images/V10 RS.png',
      'images/Vanaheim.png',
      'images/Vande Widebody.png',
      'images/Vanguard.png',
      'images/Vern.png',
      'images/Verona Evo.png',
      'images/Vessel.png',
      'images/Viscount.png',
      'images/Vivec.png',
      'images/Vizier.png',
      'images/Voyager.png',
      'images/Vulture VT.png',
      'images/Vulture.png',
      'images/Wagen 6x6.png',
      'images/Wagen.png',
      'images/Widebody Carbon.png',
      'images/Widebody Comet.png',
      'images/Widebody Contender.png',
      'images/Widebody Cruiser.png',
      'images/Widebody Exotica.png',
      'images/Widow Xtreme.png',
      'images/Widow.png',
      'images/X60S.png',
      'images/Yasko.png',
      'images/Zen3.png',
      'images/Zen4.png',
      'images/Zenith.png',
      'images/Zenna GTR.png',
      'images/Zenna.png',
      'images/Zephyr Evo.png',
      'images/ZeroOne Evo.png',
      'images/ZeroOne R.png',
      'images/ZeroOne.png',
      'images/Zeta Roadster.png',
      'images/Zeus Evo.png',
      'images/Zoomer.png',
    ];
    setImageList(images);
  }, []);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: sections.length,
        image: '',
        name: '',
        price: '',
        tvValue: '',
        isSold: false,
        isReserv: false,
        isTV: false,
        isDesc: false,
        selectedOption: 'FS',
        count: 1,
        serial: '',
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

  const markAsTV = (index: number) => {
    const newSections = [...sections];
    newSections[index].isTV = !newSections[index].isTV;
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

      const imageName = image.split('/').pop()?.split('.')[0] || '';
      const cleanedImageName =
        imageName === "'Rotary Evo'"
          ? '"Rotary Evo"'
          : imageName === "Insect 'Hubert'"
          ? 'Insect "Hubert"'
          : imageName === "B-127 'Bumblebee'"
          ? 'B-127 "Bumblebee"'
          : imageName === "D-16 'Megatron'"
          ? 'D-16 "Megatron"'
          : imageName === "Elita-1 'Elita'"
          ? 'Elita-1 "Elita"'
          : imageName === "Orion Pax 'Optimus Prime'"
          ? 'Orion Pax "Optimus Prime"'
          : imageName;
      newSections[selectedSectionIndex].name = cleanedImageName;

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
    newSections[index].name = e.target.value;
    setSections(newSections);
  };

  const handleOptionSelect = (index: number, option: string) => {
    const newSections = [...sections];
    newSections[index].selectedOption = option;
    setSections(newSections);
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].price = e.target.value;
    setSections(newSections);
  };

  const handleTvValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].tvValue = e.target.value;
    setSections(newSections);
  };

  const handleCountChange = (index: number, newCount: number) => {
    const newSections = [...sections];
    newSections[index].count = newCount;
    setSections(newSections);
  };

  const toggleAddSectionVisibility = () => {
    setIsAddSectionVisible((prev) => !prev);
  };

  const toggleOwnerInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const handleSerialChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      newSections[index].serial = inputValue ? `#${inputValue}` : '';
    } else {
      newSections[index].serial = inputValue;
    }

    setSections(newSections);
  };

  const handleDragStart = (index: number) => {
    setSelectedSectionIndex(index);
  };

  const handleDrop = (index: number) => {
    if (selectedSectionIndex !== null && selectedSectionIndex !== index) {
      const newSections = [...sections];
      const [movedSection] = newSections.splice(selectedSectionIndex, 1);
      newSections.splice(index, 0, movedSection);
      setSections(newSections);
      setSelectedSectionIndex(null);
    }
  };

  const detailsRef = useRef<HTMLDivElement>(null);

  const handleAction = async (action: 'screenshot' | 'copy' | 'slicedScreenshot') => {
    setIsEditing(false); // Set editing to false

    if (action === 'screenshot') {
      await captureFullSiteScreenshot();
    } else if (action === 'slicedScreenshot') {
      await captureScreenshotsInGroups();
    } else if (action === 'copy') {
      await copyToClipboard();
    }

    setIsEditing(true); // Set editing back to true after action
  };

  const captureScreenshotsInGroups = async () => {
    const sectionsPerImage = 6; // Number of sections per image
    const totalSections = sections.length; // Total number of sections
    const numberOfImages = Math.ceil(totalSections / sectionsPerImage); // Calculate how many images we need

    for (let i = 0; i < numberOfImages; i++) {
      const start = i * sectionsPerImage; // Starting index for the current group
      const end = start + sectionsPerImage; // Ending index for the current group
      const sectionsToCapture = sections.slice(start, end); // Get the sections for the current image

      // Create a temporary container to render the sections to capture
      const tempContainer = document.createElement('div');
      tempContainer.style.display = 'flex'; // Optional: Adjust layout as needed
      tempContainer.style.flexWrap = 'wrap'; // Optional: Adjust layout as needed
      tempContainer.style.backgroundColor = '#1e2122'; // Optional: Adjust layout as needed
      tempContainer.style.padding = '10px'; // Optional: Add padding for better spacing

      // Render only the sections that belong to the current group
      sectionsToCapture.forEach((section) => {
        const sectionElement = document.createElement('div');
        sectionElement.style.width = 'calc(100% / 3)'; // Adjust width for 3 sections per row
        sectionElement.style.boxSizing = 'border-box'; // Ensure padding/margin doesn't affect width
        sectionElement.style.padding = '10px';
        ReactDOM.render(
          <SectionComponent
            key={section.id}
            section={section}
            index={section.id}
            markAsSold={() => {}}
            markAsReserved={() => {}}
            markAsTV={() => {}}
            removeSection={() => {}}
            handleCountChange={() => {}}
            handleTextChange={() => {}}
            handleCustomTextChange={() => {}}
            handleTvValueChange={() => {}}
            openImageModal={() => {}}
            handleOptionSelect={() => {}}
            handleSerialChange={() => {}}
            isEditing={false}
          />,
          sectionElement
        );

        tempContainer.appendChild(sectionElement);
      });

      // Append the temporary container to the body
      document.body.appendChild(tempContainer);

      // Capture the screenshot of the current group
      await captureScreenshot(tempContainer); // Pass the tempContainer here

      // Remove the temporary container from the body
      document.body.removeChild(tempContainer);
    }
  };

  const captureFullSiteScreenshot = async () => {
    if (detailsRef.current) {
      await captureScreenshot(detailsRef.current);
    }
  };

  const captureScreenshot = async (element: HTMLElement) => {
    const html2canvas = (await import('html2canvas')).default;

    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL('image/png');

    const date = new Date();
    const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}.${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}.${date.getSeconds().toString().padStart(2, '0')}`;
    const dynamicFilename = `project_drive_world_${formattedDate}_${formattedTime}.png`;

    const link = document.createElement('a');
    link.href = imgData;
    link.download = dynamicFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (detailsRef.current) {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(detailsRef.current, {
        scale: 1,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          } catch (err) {
            console.error('Failed to copy image:', err);
          }
        }
      }, 'image/png');
    }
  };

  return (
    <div>
      {isInfoVisible && (
        <div className="info-header">
          <span>
            Site made by&nbsp;
            <a href="https://x.com/TheSniezek" target="blank" className="info-header-link">
              @TheSniezek
            </a>
          </span>
          <span>
            If you have some ideas or something you want to tell me here's my straw page&nbsp;
            <a href="https://sniezek.straw.page/" target="blank" className="info-header-link">
              Sniezek's Place
            </a>
          </span>
        </div>
      )}
      <div className="toolbar-header">
        <div className="toolbar-header-section-container">
          <div className="toolbar-section">
            <div className="toolbar-info">Save full as image</div>
            <button className="toolbar-button" onClick={() => handleAction('screenshot')}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11"
                  stroke="#ded8d4"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25"
                  stroke="#ded8d4"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M18 3V8M18 8L16 6M18 8L20 6"
                  stroke="#ded8d4"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <div className="toolbar-section">
            <div className="toolbar-info long-text">
              Save as multiple images to 6 section in each
            </div>
            <button className="toolbar-button" onClick={() => handleAction('slicedScreenshot')}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11"
                  stroke="#ded8d4"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25"
                  stroke="#ded8d4"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M18 3V8M18 8L16 6M18 8L20 6"
                  stroke="#ded8d4"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <div className="toolbar-section">
            <div className="toolbar-info">Copy full to the clipboard</div>
            <button className="toolbar-button" onClick={() => handleAction('copy')}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M12 11V17M12 17L10 15M12 17L14 15"
                  stroke="#ded8d4"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <div className="toolbar-section">
            <div className="toolbar-info">
              {isAddSectionVisible ? 'Hide add section indicator' : 'Show add section indicator'}
            </div>
            <button className="toolbar-button" onClick={toggleAddSectionVisibility}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 8V16M16 12H8M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                  stroke="#ded8d4"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <button className="info-header-button" onClick={toggleOwnerInfoVisibility}>
          {isInfoVisible ? 'Hide' : 'Show'} site
          <br />
          owner info
        </button>
        {/* <div className="toolbar-section"></div> */}
      </div>
      <div className="sections-body" ref={detailsRef}>
        <div className="sections-center">
          <div className="sections-container">
            {sections.map((section, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
              >
                <SectionComponent
                  key={index}
                  section={section}
                  index={index}
                  markAsSold={markAsSold}
                  markAsReserved={markAsReserved}
                  markAsTV={markAsTV}
                  removeSection={removeSection}
                  handleCountChange={handleCountChange}
                  handleTextChange={handleTextChange}
                  handleCustomTextChange={handleCustomTextChange}
                  handleTvValueChange={handleTvValueChange}
                  openImageModal={openImageModal}
                  handleOptionSelect={handleOptionSelect}
                  handleSerialChange={handleSerialChange}
                  isEditing={isEditing}
                />
              </div>
            ))}

            {isModalOpen && (
              <ImageModal
                images={filteredImages}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                selectImage={selectImage}
                closeModal={() => setIsModalOpen(false)}
              />
            )}

            {isAddSectionVisible && (
              <div className="add-section" onClick={addSection}>
                <span>+</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionManager;
