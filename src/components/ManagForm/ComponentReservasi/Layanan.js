import React, { useState, useEffect } from "react";
import $ from "jquery"; // Impor jQuery
import axios from "axios";
import { linkApiEx } from "../../../../utils/globals";
// import BulanLanjut from "./NextMonth";
import FormBio from "./FormBio";
import Link from "next/link";

const ReservasiLayanan = () => {
  const [step, setStep] = useState(1);
  const [namaKota, setNamaKota] = useState([]);

  const [dataForm, setDataForm] = useState({
    idKota: "",
    namaKota: "",
    idKlinik: "",
    namaKlinik: "",
    noteKlinik: "",
    jam: "",
    tgl: "",
    bulan: "",
    tahun: "",
    // sesi inputan informasi
    tesHIV: false,
    tesViralLoad: false,
    bookingFor: "",
    namaUser: "",
    noHPWA: "",
    emailUser: "",
    tglLahir: "",
    bulanLahir: "",
    tahunLahir: "",
    usiaUser: "",
    gender: "",
    berhubunganSexDengan: "",
    rujukTesHIV: "",
    sudahTesHIVBlnIni: "",
  });

  // Mengirim permintaan POST dengan Axios
  const fPostReservasi = () => {
    // Mendapatkan tanggal dan jam saat ini di sisi klien
    const currentDate = new Date();

    // Format tanggal dan jam
    const currentDateTime = currentDate.toISOString();
    // Data yang akan di kirim
    const dataToSend = {
      res_created_date: currentDateTime,
      res_date: dataForm.tgl,
      clinic_id: dataForm.idKlinik,
      token_id: 0,
      country_id: dataForm.idKota,
      client_name: dataForm.namaUser,
      client_phone_num: dataForm.noHPWA,
      client_email: dataForm.emailUser,
      client_age: dataForm.usiaUser,
      client_reserved_services: null,
      client_birthdate:
        dataForm.tglLahir +
        " " +
        dataForm.bulanLahir +
        " " +
        dataForm.tahunLahir,
      client_booking: dataForm.bookingFor,
      // tambahan
      // client_hiv_test:
      // client_hiv_test_3_month,
    };

    // Konfigurasi untuk header "Content-Type"
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`${linkApiEx}/reservations`, dataToSend, config)
      .then((response) => {
        // Handle respons sukses di sini
        console.log("Respon Berhasil:", response.data);
      })
      .catch((error) => {
        // Handle kesalahan di sini
        console.error("Kesalahan:", error);
      });
  };

  const fDataKota = async () => {
    const response = await axios.get(`${linkApiEx}/locations/all`);
    setNamaKota(response.data.data);
    console.log("ini kota", response.data.data);
  };

  const [dataKlinik, setDataKlinik] = useState([]);
  const [operationalTime, setdataOperationalTime] = useState([]);
  const [klinikIndex, setKlinikIndex] = useState();
  const [nextMonth, setNextMonth] = useState([]);

  const fNextMonth = async () => {
    const response = await axios.get(`${linkApiEx}/next-month?amount=8`);
    setNextMonth(response.data);
  };

  const fUpdateNextMonth = async (idKlinik, bulan, tahun) => {
    const response = await axios.get(
      `${linkApiEx}/reservasi-time-month?clinic_id=${idKlinik}&month=${bulan}&year=${tahun}&interval=20`
    );

    setdataOperationalTime(response.data.data);
    console.log("data form hla 22", dataForm.dataForm);
    console.log("sedOP", operationalTime);
    console.log("op", operationalTime);
    console.log(response.data.data);
    console.log("dtaa", idKlinik, bulan, tahun);
  };

  useEffect(() => {
    fNextMonth();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Untuk membuat scroll menjadi halus
    });
  };

  const fDataKlinik = async (id) => {
    console.log(id);
    if (namaKota) {
      const response = await axios.get(
        `${linkApiEx}/clinics/all?location_id=${id}`
      );
      setDataKlinik(response.data.data);

      console.log("iniii res", response.data.data);
    }
  };

  const fOperationalTime = async (id) => {
    console.log(id);
    if (namaKota) {
      const response = await axios.get(
        `${linkApiEx}/reservasi-time?clinic_id=${id}&interval=20`
      );
      setdataOperationalTime(response.data.data_days_in_month);
    }
  };

  console.log("iniii res timeee", operationalTime);

  console.log("indx klinik", klinikIndex);

  useEffect(() => {
    fDataKota();
    kodeAksi();
  }, []);

  useEffect(() => {
    kodeAksi();
  }, [dataForm]);

  useEffect(() => {
    kodeAksi();
  }, [namaKota]);

  const handleClick = (name, value) => {
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const kodeAksi = () => {
    // Menambahkan event handler untuk tombol dengan kelas "button"
    $(".buttonClick").click(function () {
      // handleButtonClick();
      var $btn = $(this),
        $step = $btn.parents(".modalku-body"),
        stepIndex = $step.index(),
        $pag = $(".modalku-header span").eq(stepIndex);
      console.log("page", stepIndex);
      // console.log("ini step", stepIndex);
      if (
        stepIndex === 0 ||
        stepIndex === 1 ||
        stepIndex === 2 ||
        stepIndex === 3
      ) {
        step1($step, $pag);
      } else {
        step3($step, $pag);
      }
    });

    $(".ulangi").click(function () {
      $(".modalku-wrap")
        .removeClass("animate-up")
        .find(".modalku-body")
        .first()
        .addClass("is-showing")
        .siblings()
        .removeClass("is-showing");

      $(".modalku-header span")
        .first()
        .addClass("is-active")
        .siblings()
        .removeClass("is-active");
      $(this).hide();
    });

    // Fungsi-fungsi step1 dan step3
    function step1($step, $pag) {
      // console.log("step1");
      // animate the step out
      $step.addClass("animate-out");

      // animate the step in
      setTimeout(function () {
        $step
          .removeClass("animate-out is-showing")
          .next()
          .addClass("animate-in");
        $pag.removeClass("is-active").next().addClass("is-active");
      }, 500);

      // after the animation, adjust the classes
      setTimeout(function () {
        $step.next().removeClass("animate-in").addClass("is-showing");
      }, 1000);
    }

    function step3($step, $pag) {
      // console.log("3");

      // animate the step out
      $step.parents(".modalku-wrap").addClass("animate-up");
      $(".rerun-button").css("width", "100px");
      $(".modalku-bodies").css("min-height", "100px");

      setTimeout(function () {
        $(".rerun-button").css("display", "inline-block");
      }, 300);
    }

    // Event handler untuk tombol "rerun-button"
    $(".rerun-button").click(function () {
      $(".modalku-bodies").css("min-height", "850px");
      $(".modalku-wrap")
        .removeClass("animate-up")
        .find(".modalku-body")
        .first()
        .addClass("is-showing")
        .siblings()
        .removeClass("is-showing");

      $(".modalku-header span")
        .first()
        .addClass("is-active")
        .siblings()
        .removeClass("is-active");
      $(this).hide();
    });
  };

  const handleButtonClick = () => {
    if (step === 1 || step === 2) {
      setStep(step + 1);
    } else {
      // Handle step 3 logic here
      // console.log("Step 3");
    }
  };

  const handleRerunButtonClick = () => {
    setStep(1);
  };

  return (
    <>
      <div
        style={{
          background: "#fff459",
          backgroundImage: "url(/assets/svg/bg-form.svg)",
          minHeight: "8000px",
        }}
      >
        <div
          className="modalku-wrap"
          style={{ overflow: "auto", minHeight: "8000px" }}
        >
          <div
            className="modalku-header glass"
            style={{ border: "1px solid white" }}
          >
            <span className="is-active"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="modalku-bodies">
            <div className="modalku-body modalku-body-step-1 is-showing">
              <div className="title">Pilih Lokasi Loe</div>
              {/* <div className="description">Hello there, Let's play a game.</div> */}
              {/* isi dari setep pertama */}
              <form>
                <div className="text-center col-md-4 container-fluid">
                  {namaKota.length > 0
                    ? namaKota.map((kota, index) => (
                        <div
                          id="heading"
                          key={kota.id + "-" + index}
                          className="glass glass--gradient glass--heading mt-4 buttonClick text-align-center"
                          style={{
                            border: "1px solid white",
                            fontFamily: "Lilita One",
                          }}
                          onClick={() => {
                            handleClick("idKota", kota.id);
                            handleClick("namaKota", kota.name);
                            fDataKlinik(kota.id);
                          }}
                        >
                          <span className="form-header">
                            <span
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundImage: "url(/assets/img/logo.png)",
                                backgroundSize: "cover",
                              }}
                            ></span>
                            <span className="form-title">{kota.name}</span>
                          </span>
                          {/* <button className="form-close-button">✕</button> */}
                        </div>
                      ))
                    : null}
                  {/* <div className="button glass mt-3">Start</div> */}
                </div>
              </form>
              {/* end isi dari step pertama */}
            </div>
            <div className="modalku-body modalku-body-step-2">
              {/* <div className="title">Step 2</div> */}
              <div className="title">Pilih Penyedia Layanan</div>
              {dataKlinik
                ? dataKlinik.map((klinik, index) => (
                    <div
                      key={index}
                      id="heading"
                      className="glass glass--gradient glass--heading mt-4 buttonClick"
                      style={{
                        border: "4px solid white",
                        fontFamily: "Lilita One",
                      }}
                      onClick={() => {
                        handleClick("idKlinik", klinik.id);
                        handleClick("namaKlinik", klinik.name);
                        handleClick("noteKlinik", klinik.res_notes);
                        setKlinikIndex(index);
                        fOperationalTime(klinik.id);
                      }}
                    >
                      <span className="p-2">
                        <span
                          className="bg-app p-1 bordered"
                          style={{ fontSize: "20pt", fontFamily: "Lilita One" }}
                        >
                          {klinik.name}
                        </span>
                        <br />
                        <span className="bi bi-map-fill">
                          {" "}
                          Lokasi: {klinik.location_desc}
                        </span>
                        <br />
                        {/* <span className="bi bi-emoji-sunglasses-fill">
                          {" "}
                          {address_desc}
                        </span>
                        <br /> */}
                        <span className="bi bi-geo-alt-fill">
                          {" "}
                          Alamat: {klinik.address_desc}
                        </span>
                        <br />
                        {/* <span className="bi bi-telephone-outbound-fill">
                          {" "}
                          Telepon: {klinik[4]}
                        </span>
                        <br /> */}
                        {/* <hr style={{ width: "100px" }} /> */}
                        <span className="bg-app2">
                          <i className="bi bi-pen-fill"></i> Informasi Tambahan:{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: klinik.res_notes,
                            }}
                          ></span>
                        </span>
                      </span>
                    </div>
                  ))
                : null}
              {/* <div className="mt-5"></div> */}
              {/* <a href="#TopMe">tesssss</a> */}
            </div>

            <div className="modalku-body modalku-body-step-3">
              <div className="title">
                Pilih Tanggal Perkiraan Waktu Loe Sempat ke Loket
              </div>
              <div className="text-center">
                {operationalTime
                  ? operationalTime.map((day, index) => (
                      <div className="row border mb-3" key={index}>
                        <div
                          className="col-md-4 d-flex align-items-center justify-content-center"
                          style={{
                            border: "2px solid white",
                          }}
                        >
                          <div className="p-2 text-align-center">
                            <span>{day.day_name}</span>
                            <div style={{ fontSize: "30pt" }}>
                              {day.date_day}
                            </div>
                            <span>
                              {day.month_name} {day.year}
                            </span>
                            {/* <img src='/assets/svg/{.svg' /> */}
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="text-align-center">
                            <div className="row">
                              {day.time_list
                                ? day.time_list.map((time, index) =>
                                    time
                                      ? time.map((subTime, subIndex) => (
                                          <div
                                            className="col-md-2 bg-app2 buttonClick"
                                            style={{
                                              border: "2px solid white",
                                            }}
                                            onClick={() => {
                                              handleClick("jam", subTime);
                                              handleClick("tgl", day.date_day);
                                              handleClick(
                                                "bulan",
                                                day.month_name
                                              );
                                              handleClick("tahun", day.year);
                                              scrollToTop();
                                            }}
                                          >
                                            <center>
                                              <div key={subIndex}>
                                                <span className="bi bi-clock"></span>
                                                <p>{subTime}</p>
                                              </div>
                                            </center>
                                          </div>
                                        ))
                                      : null
                                  )
                                : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>

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
                                className="col-md-3 bg-app2"
                                style={{
                                  border: "2px solid white",
                                }}
                                onClick={() => {
                                  fUpdateNextMonth(
                                    dataForm.idKlinik,
                                    next.month_name_int,
                                    next.year
                                  );
                                  scrollToTop();
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
            </div>

            <div className="modalku-body modalku-body-step-4">
              <div className="title">Langkah Terakhir</div>
              <center
                style={{
                  marginTop: "-30px",
                  marginBottom: "30px",
                  fontFamily: "Lilita One",
                }}
              >
                <span>Lengkapi informasi Loe!</span>
              </center>
              <FormBio dataForm={dataForm} />
              <center>
                <div
                  className="buttonClick mt-3 btn btn-dark w-100"
                  onClick={() => {
                    scrollToTop();
                    fPostReservasi();
                  }}
                >
                  Submit
                </div>
              </center>
            </div>

            <div className="modalku-body modalku-body-step-5">
              <div className="title">Success</div>
              <center
                style={{
                  marginTop: "-30px",
                  marginBottom: "30px",
                  fontFamily: "Lilita One",
                }}
              >
                <span>
                  Loe telah sukses membuat janji temu, selanjutnya silahkan
                  tunggu nomor antrian lewat email ataupun no HP/WhatsApp sesuai
                  dengan kontak yang sudah loe berikan!
                </span>
                <p></p>
                <br />
                <Link className="btn btn-warning" href="/">
                  <span className="bi bi-house-fill"> </span>
                  Kembali ke Dashboard
                </Link>
                <div className="ulangi btn btn-dark">
                  <span className="bi bi-arrow-repeat"> </span>Ulangi Reservasi
                </div>
              </center>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div
            className="rerun-button"
            style={{ position: "absolute", top: "300px" }}
          >
            ReRun
          </div>
        </div>
      </div>

      <style jsx>
        {`
          html {
            background: radial-gradient(#fff176, #f57f17);
            min-height: 100%;
            font-family: "Roboto", sans-serif;
          }

          ::-webkit-scrollbar {
            width: 0px;
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #fedf16, #fff459);
            border-radius: 5px;
          }

          .title {
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 30px;
            color: #ff8f00;
            font-weight: 300;
            font-size: 24px;
            letter-spacing: 1px;
          }

          .description {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
          }

          input[type="text"],
          input[type="email"] {
            padding: 10px 20px;
            border: 1px solid #999;
            border-radius: 3px;
            display: block;
            width: 100%;
            margin-bottom: 20px;
            box-sizing: border-box;
            outline: none;
          }
          input[type="text"]:focus,
          input[type="email"]:focus {
            border-color: #ff6f00;
          }

          input[type="radio"] {
            margin-right: 10px;
          }

          label {
            margin-bottom: 20px;
            display: block;
            font-size: 18px;
            color: #666;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 20px 0;
            cursor: pointer;
          }
          label:first-child {
            margin-bottom: 0;
            border-bottom: none;
          }

          .button,
          .rerun-button {
            padding: 10px 20px;
            border-radius: 3px;
            background: black;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            cursor: pointer;
          }
          .button:hover,
          .rerun-button:hover {
            background: #fce10b;
          }
          .button.rerun-button,
          .rerun-button.rerun-button {
            border: 1px solid rgba(255, 255, 255, 0.6);
            margin-bottom: 50px;
            box-shadow: 0px 10px 15px -6px rgba(0, 0, 0, 0.2);
            display: none;
          }

          .text-center {
            text-align: center;
          }

          .modalku-wrap {
            max-width: 1200px;
            margin: 50px auto;
            transition: transform 300ms ease-in-out;
            opacity: "0.5";
          }

          .modalku-header {
            height: 45px;
            background: #fce10b;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modalku-header span {
            display: block;
            height: 12px;
            width: 12px;
            margin: 5px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.2);
          }
          .modalku-header span.is-active {
            background: rgba(0, 0, 0, 0.4);
            background: #ff8f00;
          }

          .modalku-bodies {
            position: relative;
            perspective: 1000px;
          }

          .modalku-body {
            background: rgba(255, 255, 255, 0.5);
            padding: 40px 20px;
            box-shadow: 0px 50px 30px -30px rgba(0, 0, 0, 0.3);
            margin-bottom: 50px;
            position: absolute;
            top: 0;
            display: none;
            box-sizing: border-box;
            width: 100%;
            transform-origin: top left;
          }
          .modalku-body.is-showing {
            display: block;
          }

          .animate-out {
            -webkit-animation: out 600ms ease-in-out forwards;
            animation: out 600ms ease-in-out forwards;
          }

          .animate-in {
            -webkit-animation: in 500ms ease-in-out forwards;
            animation: in 500ms ease-in-out forwards;
            display: block;
          }

          .animate-up {
            transform: translateY(-500px) rotate(30deg);
          }

          @-webkit-keyframes out {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            60% {
              transform: rotate(60deg);
            }
            100% {
              transform: translateY(800px) rotate(10deg);
            }
          }

          @keyframes out {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            60% {
              transform: rotate(60deg);
            }
            100% {
              transform: translateY(800px) rotate(10deg);
            }
          }
          @-webkit-keyframes in {
            0% {
              opacity: 0;
              transform: rotateX(-90deg);
            }
            100% {
              opacity: 1;
              transform: rotateX(0deg);
            }
          }
          @keyframes in {
            0% {
              opacity: 0;
              transform: rotateX(-90deg);
            }
            100% {
              opacity: 1;
              transform: rotateX(0deg);
            }
          }

          // add
          :root {
            --r: 20px;
            --c: #171717;
            --light-reflect: inset -5px 20px 2px -20px #fff,
              inset 5px -20px 2px -20px #fff;
            --shadow-reflect: inset -19px 1px 2px -20px #000,
              inset 19px 1px 2px -20px #000, inset 19px 1px 2px -20px #000,
              inset -15px -26px 3px -30px #000;
            --hh: 8rem;
          }

          body {
            display: flex;
            padding: 0 2rem;
            color: var(--c);
            font-family: sans-serif;
            align-items: center;
            justify-content: center;
            min-height: 100svh;
            background: radial-gradient(#ffffff54 2px, transparent 0) 0 0/40px
                40px,
              radial-gradient(#00000026 2px, transparent 0) -1px 1px/40px 40px,
              radial-gradient(ellipse at 150% -50%, #6d788f, #fff);
          }

          .form {
            position: relative;
            --gap: 0.5rem;
            max-width: 50rem;
            flex: 1 1 auto;
            height: var(--hh);
            &.open {
              height: calc(var(--hh) * 1.5 + var(--gap));
            }
            transition: 250ms ease all;
          }
          button {
            appearance: none;
            border: none;
            background: none;
          }
          input {
            appearance: none;
            border: none;
            background: none;
            width: 100%;
            height: 4rem;
            padding: 0 2rem;
            color: var(--c);
            &:focus {
              outline: none;
            }
            &::placeholder {
              opacity: 0.3;
            }
          }
          @keyframes text {
            0% {
              clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            100% {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
          .form-title {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            animation: text linear 1s forwards;
            animarion-delay: 1s;
          }
          @keyframes gradient {
            0% {
              background-size: 100%;
            }
            50% {
              background-size: 150%;
            }

            100% {
              background-size: 100%;
            }
          }

          .glass {
            position: relative;
            display: flex;
            align-items: center;
            min-height: 4rem;
            border-radius: var(--r);
            border: none;
            width: 100%;
            background: rgba(#fff, 0.1);
            backdrop-filter: blur(2px);
            text-shadow: 0.25em 0.25em 1px #00000010;

            --shadow-color: 0deg 0% 64%;
            --shadow-elevation-high: 0.5px 1px 1.1px
                hsl(var(--shadow-color) / 0.28),
              1.4px 3.1px 3.4px -0.4px hsl(var(--shadow-color) / 0.27),
              2.5px 5.3px 5.9px -0.7px hsl(var(--shadow-color) / 0.25),
              3.9px 8.4px 9.3px -1.1px hsl(var(--shadow-color) / 0.24),
              6px 12.9px 14.3px -1.5px hsl(var(--shadow-color) / 0.23),
              9px 19.5px 21.6px -1.8px hsl(var(--shadow-color) / 0.21),
              13.4px 28.9px 32px -2.2px hsl(var(--shadow-color) / 0.2),
              19.3px 41.7px 46.2px -2.6px hsl(var(--shadow-color) / 0.19),
              27.1px 58.5px 64.8px -2.9px hsl(var(--shadow-color) / 0.17),
              37.1px 80px 88.6px -3.3px hsl(var(--shadow-color) / 0.16);

            --inner-light: inset 0 -6px 2px -5px #ffffff24,
              inset 0 -8px 3px -5px #ffffff3b,
              inset 0 -20px 10px -15px #ffffff5c,
              inset 7px 25px 10px -20px #ffffff5c;
            --inner-shadow: inset -20px 5px 10px -20px #00000021,
              inset -40px 50px 7px -55px #00000021;
            --external-light: 5px -30px 30px -20px #ffffff70,
              5px 10px 30px -20px #ffffff70;
            --default: var(--external-light), var(--shadow-elevation-high),
              var(--inner-light), var(--inner-shadow);
            box-shadow: var(--default);
            &:focus {
              outline: none;
            }
            &--gradient {
              background-position: center;
              animation: gradient 10s linear infinite;
              background: linear-gradient(
                45deg,
                #85d5e757,
                #7a9ed254,
                #ba6ac93d,
                #de54c217,
                #f86b2d4f
              );
            }
            &--heading {
              font-size: 1.1rem;
              &:before {
                --i: 2px;
                opacity: 0.6;
              }
              &:after {
                --i: 4px;
              }
              &:before,
              &:after {
                content: "";
                pointer-events: none;
                position: absolute;
                inset: var(--i);
                border-radius: calc(var(--r) - var(--i));
                box-shadow: var(--light-reflect), var(--shadow-reflect);
              }
            }
            > * {
              position: relative;
              z-index: 1;
            }
            &:before {
              --r: 20px;
              --bp: 50px;
              --s: calc(0% + var(--bp) + var(--r));
              --e: calc(100% - var(--bp) - var(--r));
              --z: calc(0% + var(--bp));
              --h: calc(100% - var(--bp));
              content: "";
              position: absolute;
            }
          }
          .form-header {
            height: var(--hh);
            padding: 0 2rem;
            display: flex;
            align-items: center;
            gap: 2rem;
          }
          @keyframes icon {
            0% {
              rotate: 0deg;
              scale: 0.8;
              filter: hue-rotate(0deg);
            }
            50% {
              rotate: 180deg;
              scale: 0.1;
              filter: hue-rotate(90deg);
            }

            100% {
              rotate: 360deg;
              scale: 0.8;
              filter: hue-rotate(0deg);
            }
          }
          .form-icon {
            position: relative;
            background: rgba(#fff, 0.2);
            display: block;
            aspect-ratio: 1;
            flex: 0 0;
            border-radius: 50px;
            height: 4rem;
            box-shadow: var(--light-reflect), var(--shadow-reflect);
            &:before {
              animation: icon 5000ms cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
              content: "";
              position: absolute;
              inset: 0;
              background: url(/assets/img/logo.png) center / 90% 90% no-repeat;
            }
          }
          .form-close-button {
            position: absolute;
            color: var(--c);
            background: rgba(#fff, 0.3);
            top: 0.75rem;
            right: 0.75rem;
            box-shadow: var(--light-reflect), var(--shadow-reflect);
            display: grid;
            place-content: center;
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 50px;
            cursor: pointer;
            visibility: hidden;
            opacity: 0;
            transition: 250ms ease opacity;
            .open & {
              visibility: visible;
              opacity: 1;
            }
          }
          [id="heading"] {
            transition: 250ms ease all;
            .form:not(.open) &:hover {
              scale: 0.99;
              filter: brightness(0.95);
            }
            .form:not(.open) &:active {
              scale: 0.98;
              filter: brightness(0.8);
            }
            cursor: pointer;
          }
          [id="input"] {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            height: var(--hh);
            transition: 500ms ease all;
            translate: 0 0;
            opacity: 0;
            .open & {
              translate: 0 calc(var(--hh) + var(--gap));
              height: calc(var(--hh) / 2);
              opacity: 1;
              z-index: 2;
            }
          }
        `}
      </style>
    </>
  );
};

export default ReservasiLayanan;
