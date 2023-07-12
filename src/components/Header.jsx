import '../styles/Header.css'; // Import the CSS file

const Header = () => {
  const handleBackClick = () => {
    window.location.href = 'http://mumbai.nowastes.in/'; // Replace '#' with your desired URL
  };

  return (
    <header className="header">
      <div className="back-button" onClick={handleBackClick}>
        <span>&larr;</span> Back
      </div>
      <h1 className="header-title">ZeroWaste Dashboard 3.0</h1>
    </header>
  );
};

export default Header;
