import styled from "styled-components";

export const Search = ({ placeholder }: { placeholder: string }) => {
  return (
    <SingleBox>
      <form>
        <input placeholder={placeholder} />
        <button>
          <img src="asset/icon_search2.png" />
        </button>
      </form>
    </SingleBox>
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

const SingleBox = styled.div`
  width: 250px;
  height: 35px;
  background-color: #ffffff;
  border: 2px solid #1f68f6;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & > form {
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      width: 100%;
      height: 30px;
      background: none;
      border: none;
      padding: 7px;
    }
    input:focus {
      outline: none;
    }
    & > button {
      background: inherit;
      border: none;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      overflow: visible;
      cursor: pointer;
      padding: 8px;
      & > img {
        width: 80%;
      }
    }
  }
`;
