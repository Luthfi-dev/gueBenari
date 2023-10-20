import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { linkApiEx } from "../../../../utils/globals";

const BulanLanjut = (dataForm, operationalTime) => {
  const [nextMonth, setNextMonth] = useState([]);
  console.log("data form hla 2", dataForm.dataForm);

  const fNextMonth = async () => {
    const response = await axios.get(`${linkApiEx}/next-month?amount=6`);
    setNextMonth(response.data);
  };

  const fUpdateNextMonth = async (idKlinik, bulan, tahun, operationalTime) => {
    const response = await axios.get(
      `${linkApiEx}/reservasi-time-month?clinic_id=${idKlinik}&month=${bulan}&year=${tahun}`
    );

    dataForm.dataForm.listTime = response.data.data;
    console.log("data form hla 22", dataForm.dataForm);
    console.log("sedOP", operationalTime);
    console.log("op", operationalTime);
    console.log(response.data.data);
    console.log("dtaa", idKlinik, bulan, tahun);
  };

  console.log("ini next mount", nextMonth);

  useEffect(() => {
    fNextMonth();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Untuk membuat scroll menjadi halus
    });
  };

  return (
    <>
      <div className="text-center mt-2">
        <h5>Bulan Lainnya:</h5>
        <div className="row border">
          <div className="col-md-12">
            <div className="text-align-center">
              <div className="row">
                {nextMonth
                  ? nextMonth.map((next, index) => (
                      <div
                        key={index}
                        className="col-md-4 bg-app2"
                        style={{
                          border: "2px solid white",
                        }}
                        onClick={() => {
                          fUpdateNextMonth(
                            dataForm.dataForm.idKlinik,
                            next.month_name_int,
                            next.year,
                            operationalTime
                          );
                          // scrollToTop();
                        }}
                      >
                        <center>
                          <div>
                            <span className="bi bi-calendar"></span>
                            <p>
                              {next.month_name_text} {next.year}
                            </p>
                          </div>
                        </center>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulanLanjut;
