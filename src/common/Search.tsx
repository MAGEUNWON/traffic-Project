import styled from "styled-components";

const Search = ({ placeholder }: { placeholder: string }) => {
  return (
    <form>
      <SearchWarp type="text" placeholder={placeholder} />
    </form>
  );
};

const SearchWarp = styled.input`
width: 250px;
height: 30px;
background-color: #FFFFFF;
border: 2px solid #1F68F6;
border-radius: 0.5rem;
`;

export default Search;