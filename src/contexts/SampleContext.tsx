import React, {
  useReducer,
  createContext,
  useContext,
  Dispatch,
  useState,
} from "react";

export const ResultContext = createContext(undefined);

type State = {
  count: number;
  text: string;
  isGood: boolean;
};

type Action =
  | { type: "SET_COUNT"; count: number }
  | { type: "SET_TEXT"; text: string }
  | { type: "TOGGLE_GOOD" };

type SampleDispatch = Dispatch<Action>;

const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<SampleDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_COUNT":
      return {
        ...state,
        count: action.count,
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "TOGGLE_GOOD":
      return {
        ...state,
        isGood: !state.isGood,
      };
    default:
      throw new Error("Unhandled action");
  }
}

// export function SampleProvider({children}: {children:React.ReactNode}){
//   const [state, dispatch] = useReducer(reducer, {

//   })
// }
// const ResultContextProvider = ({children}) => {
//   const [result, setResult] = useState<string[]>([]);
//   const value = {
//     result,
//     setResult,
//   };
//   return (
//     <ResultContext.Provider value={value}>{children}</ResultContext.Provider>
//   );
// }

// export function ResultContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [result, setResult] = useState<string[]>([]);
//   const value = {
//     result,
//     setResult,
//   };
//   return (
//     <ResultContext.Provider value={value}>{children}</ResultContext.Provider>
//   );
// }

// export function useResultContext() {
//   return useContext(ResultContext);
// }
