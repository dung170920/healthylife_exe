import { Box, Stack, styled, Typography } from "@mui/material";

// const BMIBox = styled(Box)(() => ({
//     "& .c-bmi" :{
//         backgroundColor: "hsl(211, 20%, 92%)",
//         borderRadius: "25rem",
//         boxSizing: "border-box",
//         padding: "1rem",
//         maxWidth: "40rem",
//         width: "100%",
//       },

//       "& .c-bmi fieldset" :{
//         border: 0
//         margin: 0,
//         padding: 0,
//       },

//       "& .c-bmi__group-text": {
//         display: "none",
//         font-size: "small",
//         order: 2,
//         padding: "1rem 0",
//         textAlign: "left",
//         width: "100%",
//       },

//       "& .c-bmi__groups": {
//         border: 0,
//         flexWrap: "wrap",
//         fontSize: "x-small",
//         padding: 0,
//         textAlign: "center",
//         width: "100%",
//       },

//       "& .c-bmi__groups label" : {
//         display: "block",
//         padding: ".5rem",
//         position: "relative",
//       },

//       "& .bmi-g0": { backgroundColor: "#4691e2" },
//       "& .bmi-g1":{ backgroundColor: "#0cb764" },
//       "& .bmi-g2":{ backgroundColor: "#febf18"},
//       "& .bmi-g3":{ backgroundColor: "#fc8711"},
//       "& .bmi-g4":{ backgroundColor: "#ff6455" },
//       "& .bmi-g5":{ backgroundColor: "#cc1100", color: "#fff" },

//       "& .c-bmi__groups input:checked + label::before" : {
//         backgroundColor: "#fff",
//         clip-path: "polygon(0% 0%,0% 100%,75.00% 50.00%)",
//         content: '',
//         display: "inline-block",
//         height: "1rem",
//         left: "0.5rem",
//         position: "absolute",
//         top: "0.35rem",
//         width: "1rem",
//       },

//       "& .c-bmi__groups input:checked + label + div": {
//         display: "block",
//         flex: "0 0 100%",
//       },

//       "& .c-bmi__label" : {
//         display: "block",
//         fontSize: "medium",
//         margin: "0 0 1rem 0",
//         position: "relative",
//       },

//       "& .c-bmi__label output" : {
//         position: "absolute",
//         right: 0,
//         top: 0,
//       },

//       "& .c-bmi__range" : {
//         -webkitAppearance: "none",
//         appearance: "none",
//         backgroundColor: "transparent",
//         outline: "none",
//         width: "100%",
//       },

//       "& .c-bmi__range::-webkit-slider-runnable-track" : {
//         backgroundImage: "linear-gradient(to bottom, transparent 45%, lightslategray 45%, lightslategray 55%, transparent 55%)",
//       },

//       "& .c-bmi__range::-moz-range-track" {
//         backgroundImage: "linear-gradient(to bottom, transparent 45%, lightslategray 45%, lightslategray 55%, transparent 55%)",
//       },

//       "& .c-bmi__range::-webkit-slider-thumb" : {
//         -webkitAppearance: "none",
//         appearance: "none",
//         backgroundColor: "hsl(225,100%,20%)",
//         borderRadius: "50%",
//         height: "2rem",
//         width: "2rem",
//       },

//       "& .c-bmi__range::-moz-range-thumb" : {
//         appearance: "none";
//         backgroundColor: "hsl(225,100%,20%)";
//         border-radius: 50%;
//         height: 2rem;
//         width: 2rem;
//       }
//       .c-bmi__range:focus::-webkit-slider-thumb {
//         background-color: hsl(225,30%,60%);
//         box-shadow: inset 0 0 0 0.25rem hsl(225,100%,20%);
//       }
//       .c-bmi__range:focus::-moz-range-thumb {
//         background-color: hsl(225,30%,60%);
//         box-shadow: inset 0 0 0 0.25rem hsl(225,100%,20%);
//       }
//       .c-bmi__result {
//         display: block;
//         font-size: 200%;
//         margin-bottom: 1.5rem;
//         text-align: right;
//       }
//       .c-bmi [type="radio"] { display: none; }

//       /* RWD */
//       @media (min-width: 600px) {
//         .c-bmi__groups { display: flex; }
//         .c-bmi__groups input:checked + label::before {
//           background-color: inherit;
//           clip-path: polygon(0% 0%,100% 0%,50% 100%);
//           left: 50%;
//           top: -1rem;
//           transform: translateX(-50%);
//           width: 1.5rem;
//         }
//         .c-bmi__groups label { flex: 1; }
//         [for="bmi-g0"] { border-radius: .25rem 0 0 .25rem; }
//         [for="bmi-g5"] { border-radius: 0 .25rem .25rem 0; }
//       }

//       /* For this demo */
//       // body { max-width: 40rem; margin: 1rem auto; }

//   }))

const BMICalculator = () => {
  return (
    <>
      <Box>
        <form className="c-bmi">
          <label className="c-bmi__label">
            <strong>Height</strong>
            <input
              className="c-bmi__range"
              type="range"
              name="h"
              min="150"
              max="230"
              step="0.5"
              value="180"
            />
            {/* <output name="ho"><output> */}
          </label>
          <label className="c-bmi__label">
            <strong>Weight</strong>
            <input
              className="c-bmi__range"
              type="range"
              name="w"
              min="35"
              max="200"
              step="0.1"
              value="75"
            />
            <output name="wo">75</output>
          </label>
          <div className="c-bmi__result">
            Your BMI Is: <output name="r"></output>
          </div>
          <div className="c-bmi__groups">
            <input type="radio" id="bmi-g0" name="g" />
            <Typography>Underweight</Typography>
            <div className="c-bmi__group-text">
              The WHO regards a BMI of less than 18.5 as underweight and may
              indicate malnutrition, an eating disorder, or other health
              problems.
            </div>
            <input type="radio" id="bmi-g1" name="g" checked />
            <Typography>Normal</Typography>
            <div className="c-bmi__group-text">
              A BMI between 18.5 and 25 is considered normal and healthy.{" "}
            </div>
            <input type="radio" id="bmi-g2" name="g" />
            <Typography>Pre-obesity</Typography>
            <div className="c-bmi__group-text">
              People who fall into this category may be at risk of developing
              obesity.
              <br />
              This was earlier classified as "overweight".
            </div>
            <input type="radio" id="bmi-g3" name="g" />
            <Typography>Obese I</Typography>
            <div className="c-bmi__group-text">
              People who have BMI equal or over 30 may have obesity, which is
              defined as an abnormal or excessive accumulation of fat that may
              harm health.
            </div>
            <input type="radio" id="bmi-g4" name="g" />
            <Typography>Obese II</Typography>
            <div className="c-bmi__group-text">
              People who have BMI equal or over 30 may have obesity, which is
              defined as an abnormal or excessive accumulation of fat that may
              harm health.
            </div>
            <input type="radio" id="bmi-g5" name="g" />
            <Typography>Obese III</Typography>
            <div className="c-bmi__group-text">
              People who have BMI equal or over 30 may have obesity, which is
              defined as an abnormal or excessive accumulation of fat that may
              harm health.
            </div>
          </div>
        </form>
      </Box>
    </>
  );
};

export default BMICalculator;
