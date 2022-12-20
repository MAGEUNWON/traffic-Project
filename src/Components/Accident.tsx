import axios from "axios";
import React, { useEffect, useState } from "react";
import Map from "./Map";

// interface AccidentData {
//   data: [
//     {
//       addressJibun: null | string;
//       addressJibunCd: null | string;
//       addressNew: null | string;
//       controlType: null | string;
//       endDate: null | string;
//       important: null | string;
//       incTrafficCode: null | string;
//       incidentId: null | string;
//       incidentRegionCd: null | string;
//       incidentTitle: null | string;
//       incidenteGradeCd: null | string;
//       incidenteSubTypeCd: null | string;
//       incidenteTrafficCd: null | string;
//       incidenteTypeCd: null | string;
//       lane: null | string;
//       lineLinkId: null | string;
//       linkId: null | string;
//       locationData: null | string;
//       locationDataX: null | string;
//       locationDataY: null | string;
//       locationTypeCd: null | string;
//       roadName: null | string;
//       sourceCode: null | string;
//       startDate: null | string;
//       updateDate: null | string;
//     }
//   ];
// }

const Accident = () => {
  const [accidentData, setAccidentData] = useState<any>([{}]);
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/accident");
        //console.log(response.data);s
        setAccidentData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  console.log(accidentData);

  return (
    <>
      <Map accidentData={accidentData} />
    </>
  );
};

export default Accident;
