import styled from "styled-components";

export const Search = ({ placeholder }: { placeholder: string }) => {
  return (
    <form>
      <SearchWarp placeholder={placeholder} />
    </form>
  );
};

interface single {
  placeholder: string;
  onSubmit: (e: any) => void;
  onChange: (e: any) => void;
  value: string;
}

export const SingleSearch = ({
  placeholder,
  onSubmit,
  onChange,
  value,
}: single) => {
  return (
    <SingleBox>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <button type="submit" onClick={() => console.log("실행")}>
          <img src="asset/icon_search2.png" />
        </button>
      </form>
    </SingleBox>
  );
};

const SearchWarp = styled.input`
  width: 250px;
  height: 30px;
  background-color: #ffffff;
  border: 2px solid #1f68f6;
  border-radius: 0.5rem;
`;

const SingleBox = styled.div`
  width: 250px;
  height: 30px;
  background-color: gray;
  & > input {
    width: 250px;
  }
`;
