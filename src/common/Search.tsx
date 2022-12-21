import styled from "styled-components";

const Search = () => {
  return (
    <form>
      <SearchWarp type="text" placeholder="어디로갈까요?" />
    </form>
  );
};

const SearchWarp = styled.input`
  width: 250px;
  height: 30px;
  background-color: #ffffff;
  border: 2px solid #1f68f6;
  border-radius: 0.5rem;
  padding: 10px;
`;

export default Search;
