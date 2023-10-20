import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import CardHasil from "./CardHasil";

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const [steps, setSteps] = useState([
    "Identitas",
    "Kesukaan",
    "Status HIV",
    "Tes Terakhir",
  ]);

  const [question, setQuestion] = useState([
    "Apa Identitas Loe ?",
    "Loe Lebih Suka Berhubungan Seks Dengan?",
    "Status HIV Loe Saat ini Apa ..?",
    "Terakhir Loe Tes HIV Kapan ?",
  ]);

  const [img, setImg] = useState([
    "calendar.svg",
    "loveme.svg",
    "checklist.svg",
    "reminder.svg",
  ]);

  const [isiList, setIsiList] = useState([
    [
      "Gue Seorang laki-laki",
      "Gue Seorang perempuan",
      "Gue Transgender (baik transpria ataupun transpuan)",
      "Gue belum bisa menentukan",
      "Nggak ada satu pun dari opsi atas",
    ],
    [
      "Laki-laki",
      "Perempuan",
      "Transgender",
      "Siapa aja; apa pun gendernya.",
      "Nggak ada; Gue nggak aktif secara seksual.",
    ],
    ["HIV Negatif", "HIV Positif", "Hmm... Gak tau."],
    [
      "Dalam 6 bulan terakhir.",
      "Lebih dari 6 bulan lalu.",
      "...Gue  nggak inget kapan.",
      "...Gue  belum pernah tes HIV.",
    ],
  ]);

  const isStepOptional = (step) => {
    return step === 5; // Updated to match the number of steps
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedOptions([]);
  };

  const handleOptionChange = (option) => {
    const selectedIndex = selectedOptions.indexOf(option);
    let newSelected = [...selectedOptions];

    if (selectedIndex === -1) {
      newSelected.push(option);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedOptions(newSelected);
  };

  return (
    <Box
      style={{
        background: "#fff459",
        backgroundImage: "url(/assets/svg/bg-form.svg)",
      }}
    >
      <Box
        className="col-md-8 container-fluid"
        sx={{
          width: "100%",
          //marginTop: "100px",
        }}
      >
        <Stepper activeStep={activeStep} sx={{ flexDirection: "row" }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    display: "flex",
                  }}
                >
                  {activeStep === index && (
                    <Typography variant="caption">{label}</Typography>
                  )}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {/* All steps completed - you&apos;re finished */}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mt: 2 }}
              style={{ fontFamily: "Lilita One" }}
            >
              Dibawah Hasil Pengecekan HIV Loe:
            </Typography>
            <Box>
              {/* {selectedOptions.map((option, index) => (
                <Typography key={index}>{option}</Typography>
              ))} */}
              <CardHasil />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="row mt-5">
              <Typography className="col-md-4 d-none d-md-block">
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    // borderRadius: "50%",
                    // backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Di dalam lingkaran, Anda dapat menambahkan gambar */}
                  <img
                    src={`/assets/svg/${img[activeStep]}`}
                    alt="illustrasi pendukung"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      // borderRadius: "50%",
                    }}
                  />
                </div>
              </Typography>

              <Typography sx={{ mt: 2, mb: 1 }} className="col-md-8">
                <FormGroup className="m-2">
                  <Typography className="m-2">
                    <center>
                      <h2>
                        <b style={{ fontFamily: "Lilita One" }}>
                          {question[activeStep]}
                        </b>
                      </h2>
                    </center>
                  </Typography>
                  {/* // bagian menampilkan konten */}
                  {isiList[activeStep].map((option, index) => (
                    <FormControlLabel
                      className="bg-warning m-2"
                      style={{ borderRadius: "5px" }}
                      key={option}
                      control={
                        <Checkbox
                          checked={selectedOptions.includes(option)}
                          onChange={() => handleOptionChange(option)}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </Typography>
            </div>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 10, pb: 20 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                // className="btn btn-warning"
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button className="btn btn-warning" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
