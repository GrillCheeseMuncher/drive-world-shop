import './Header.scss';

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content-container">
        <div className="header-title">TheSniezek's Shop</div>
        <div className="disclaimer">
          <div className="disclaimer-title">DISCLAIMER</div> <br /> I don't have private server{' '}
          <br /> I'm not responsive if someone bids higher than you.
        </div>
      </div>
    </div>
  );
};
