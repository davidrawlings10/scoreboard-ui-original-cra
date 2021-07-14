export type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <div className="Header">
      <span style={{ padding: 10 }}>
        <a href="http://localhost:3000">Home</a>
      </span>
      <span style={{ padding: 10 }}>
        <a href="http://localhost:3000/season">Season</a>
      </span>
      <span style={{ padding: 10 }}>
        <a href="http://localhost:3000/addGame">Add Game</a>
      </span>
    </div>
  );
};

export default Header;
