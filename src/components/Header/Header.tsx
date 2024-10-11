import './Header.scss';

interface ListName {
  name: string;
  id: number;
}

interface HeaderProps {
  currentlistid: number;
  handleclick: (id: number) => void;
}

const listNames: ListName[] = [
  { name: 'Archive', id: 0 },
  { name: 'Shop', id: 1 },
];

export const Header = ({ currentlistid, handleclick }: HeaderProps) => {
  const list = listNames.map((item) => {
    const handleListClick = () => {
      handleclick(item.id);
    };

    return (
      <li
        key={item.id}
        className={`header-button${currentlistid === item.id ? ' active' : ''}`}
        onClick={handleListClick}
      >
        {item.name}
      </li>
    );
  });

  const headerTitle = currentlistid === 0 ? "TheSniezek's Archive" : "TheSniezek's Shop";

  return (
    <div className="header-container">
      <div className="header-content-container">
        <div className="header-title">{headerTitle}</div>
        <div className="buttons-container">{list}</div>
      </div>
    </div>
  );
};
