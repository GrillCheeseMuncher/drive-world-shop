import './Header.scss';

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content-container">
        <div className="header-title">TheSniezek's Shop</div>
        <div className="buttons-container">
          <button className="header-button shop-section-button">Shop</button>
          <button className="header-button archive-section-button">Archive</button>
        </div>
      </div>
    </div>
  );
};
