import { useEffect, useState } from 'react';
import './Archive.scss';
import { Section } from '../SectionManager/SectionManager'; // Ensure you import Section type

interface ArchiveProps {
  sections: Section[]; // Add a prop for archived sections
}

export const Archive: React.FC<ArchiveProps> = ({ sections }) => {
  const [archivedSections, setArchivedSections] = useState<Section[]>([]);

  // Load archived sections from localStorage when the component mounts
  useEffect(() => {
    const savedSections = localStorage.getItem('archivedSections');
    if (savedSections) {
      setArchivedSections(JSON.parse(savedSections));
    }
  }, []);

  // Save new sections to localStorage whenever the `sections` prop changes
  useEffect(() => {
    if (sections.length > 0) {
      const updatedSections = [...archivedSections, ...sections];
      setArchivedSections(updatedSections);
      localStorage.setItem('archivedSections', JSON.stringify(updatedSections));
    }
  }, [sections]);

  return (
    <div className="archive-container">
      {archivedSections.length === 0 ? (
        <p>No archived sections.</p>
      ) : (
        <table className="archive-table">
          <tbody>
            {archivedSections.map((section) => (
              <tr key={section.id}>
                <td>SOLD</td>
                <td>
                  <img src={section.image} alt="Archived" style={{ width: '120px' }} />
                </td>
                <td>{section.text}</td>
                <td>Sold price: {section.customText}</td>
                <td>Buy price: {section.buyText}</td>
                <td>
                  Profit
                  <input type="text" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
