import React, { useState } from "react";

// Komponen Card terpisah
const Card = ({ data, angka, dataForm }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCardClick = () => {
    setIsChecked(!isChecked);
  };

  console.log("hkhk atass", dataForm);

  const updateTes = (name) => {
    console.log("hkhk up", dataForm.dataForm.tesHIV);

    if (name === "tesHIV") {
      if (dataForm.dataForm.tesHIV == false) {
        dataForm.dataForm.tesHIV = true;
      } else {
        dataForm.dataForm.tesHIV = false;
      }
    } else {
      if (dataForm.dataForm.tesViralLoad == false) {
        dataForm.dataForm.tesViralLoad = true;
      } else {
        dataForm.dataForm.tesViralLoad = false;
      }
    }
  };

  console.log("hkhk", dataForm);

  return (
    <div
      className={`card col-md-5 bg-app2 ${isChecked ? "selected" : ""} m-1`}
      onClick={() => {
        handleCardClick();
        angka === 1 ? updateTes("tesHIV") : updateTes("tesViralLoad");
      }}
    >
      <label className="checkbox-container">
        <input
          type="checkbox"
          style={{ display: "none" }}
          checked={isChecked}
        />
        <span className="checkmark" style={{ marginRight: "5px" }}></span>
        <span style={{ fontWeight: "bold" }}>{data}</span>
      </label>
      <center>
        {" "}
        {angka === 1 ? (
          <img src="/assets/svg/test.svg" height={50} />
        ) : (
          <img src="/assets/svg/test.svg" height={50} />
        )}
      </center>
    </div>
  );
};

const FormBio = (dataForm) => {
  console.log("iniii", dataForm);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const handleOptionClick2 = (option) => {
    setSelectedOption2(option);
  };
  const handleOptionClick3 = (option) => {
    setSelectedOption3(option);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 70 }, (_, index) => currentYear - index);

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const inputData = (field, value) => {
    dataForm.dataForm[field] = value;
    console.log("iniii inputanForm", dataForm.dataForm);
  };

  // bagian date month year
  const date = new Date();

  // Mendapatkan nama hari
  const days1 = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const dayName = days1[date.getDay()];

  // Mendapatkan tanggal dalam bentuk integer
  const day = date.getDate();

  // Mendapatkan bulan dalam bentuk string dan integer
  const months1 = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const monthName = months1[date.getMonth()];
  const month = date.getMonth() + 1; // Ingat, bulan dimulai dari 0 (Januari) hingga 11 (Desember).

  // Mendapatkan tahun dalam bentuk integer
  const year = date.getFullYear();

  // console.log("Nama Hari:", dayName);
  // console.log("Tanggal:", day);
  // console.log("Bulan (String):", monthName);
  // console.log("Bulan (Integer):", month);
  // console.log("Tahun:", year);
  // end DMY

  return (
    <>
      <div style={{ fontFamily: "Lilitan One" }}>
        Loe sedang meminta: jam {dataForm.dataForm.jam} pada{" "}
        {dataForm.dataForm.tgl} {dataForm.dataForm.bulan} di klinik{" "}
        {dataForm.dataForm.namaKlinik},{" "}
        <span className="bg-app2">perlu diingat:</span>{" "}
        <span
          dangerouslySetInnerHTML={{
            __html: dataForm.dataForm.noteKlinik,
          }}
        ></span>
      </div>
      <hr />
      <center>
        <h3 className="bg-app p-1" style={{ fontFamily: "Lilitan One" }}>
          Pilih Layanan
        </h3>
      </center>

      <center>
        <div
          className="row pb-5"
          style={{
            backgroundImage: "url(/assets/svg/doctor.svg)",
          }}
        >
          <center>
            <div className="row col-md-6 container-fluid">
              <Card data={"Tes HIV"} angka={1} dataForm={dataForm} />
              <Card data={"Tes Viral Load"} angka={2} dataForm={dataForm} />
            </div>
            <span className="bi bi-bookmark-heart-fill text-warning fs-5"></span>
            <span>
              <b>
                {" "}
                <i>
                  Catatan biaya: Tidak ada pembayaran yang dilakukan di situs
                  web ini. Pembayaran akan dilakukan di klinik pada saat janji
                  temu.
                </i>
              </b>
            </span>
          </center>
        </div>

        {/* <img src="/assets/svg/note.svg" /> */}
      </center>
      <div className="row">
        <div className="col-md-6">
          <h3 className="bg-app p-1" style={{ fontFamily: "Lilitan One" }}>
            Informasi Kontak
          </h3>
          <div className="deskripsi" style={{ fontFamily: "Lilitan One" }}>
            Langkah terakhir! Nomor telepon Loe sangat diperlukan untuk dapat
            melakukan reservasi layanan. Nomor teleponmu dijaga kerahasiaannya
            dan digunakan oleh konselor virtual UpdateStatus untuk memberikan
            layanan tindak lanjut gratis kepada Loe.
          </div>
          <p style={{ marginTop: "20px" }}>
            Untuk siapa Loe membuat janji temu ini?
          </p>
          <center className="mt-3">
            <div className="row p-3">
              <div
                className={`card p-2 col-md-4 ${
                  selectedOption === "option1"
                    ? "bg-app border-dark"
                    : "bg-app2"
                }`}
                onClick={() => {
                  handleOptionClick("option1");
                  inputData("bookingFor", "Diri Sendiri");
                }}
                style={{ marginTop: "-20px" }}
              >
                <span>
                  <span
                    className="bi bi-person-check-fill"
                    style={{ fontSize: "16pt" }}
                  ></span>{" "}
                  Diri Sendiri
                </span>
              </div>
              <div
                className={`card p-2 col-md-4 ${
                  selectedOption === "option2"
                    ? "bg-app  border-dark"
                    : "bg-app2"
                }`}
                onClick={() => {
                  handleOptionClick("option2");
                  inputData("bookingFor", "Untuk Anak");
                }}
                style={{ marginTop: "-20px" }}
              >
                <span>
                  <span
                    className="bi bi-people"
                    style={{ fontSize: "16pt" }}
                  ></span>{" "}
                  Untuk Anak
                </span>
              </div>
              <div
                className={`card p-2 col-md-4 ${
                  selectedOption === "option3"
                    ? "bg-app  border-dark"
                    : "bg-app2"
                }`}
                onClick={() => {
                  handleOptionClick("option3");
                  inputData("bookingFor", "Untuk Orang Lain");
                }}
                style={{ marginTop: "-20px" }}
              >
                <span>
                  <span
                    className="bi bi-people-fill"
                    style={{ fontSize: "16pt" }}
                  ></span>{" "}
                  Untuk Orang Lain
                </span>
              </div>
            </div>
          </center>
          <div className="row p-2">
            <div className="form-group mt-2">
              <label style={{ fontFamily: "Lilitan One" }}>Nama Loe</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Nama Lengkap/Panggilan"
                onBlur={(e) => {
                  inputData("namaUser", e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-2">
              <label style={{ fontFamily: "Lilitan One" }}>
                Nomor Hp/WhatsApp
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Masukkan Nomor HP/WhatsApp"
                onBlur={(e) => {
                  inputData("noHPWA", e.target.value);
                }}
              />
              <span style={{ fontSize: "10pt" }}>
                <i>
                  (Jika ada WhatsApp, nomor antrian akan dikirim lewat
                  WhatsApp).
                </i>
              </span>
            </div>
            <div className="form-group mt-2">
              <label style={{ fontFamily: "Lilitan One" }}>Email Loe</label>
              <input
                type="email"
                className="form-control"
                placeholder="Masukkan Email"
                onBlur={(e) => {
                  inputData("emailUser", e.target.value);
                }}
              />
              <span style={{ fontSize: "10pt" }}>
                <i>
                  (Jika ada email, kami akan mengirim nomor antri melalui
                  email).
                </i>
              </span>
            </div>
            {/* data lahir */}
            <div className="form-group mt-2">
              <label style={{ fontFamily: "Lilitan One" }}>Tanggal Lahir</label>
              <div className="row">
                <div className="col">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      inputData("tglLahir", e.target.value);
                    }}
                  >
                    <option readOnly>Pilih Tanggal</option>
                    {days.map((day) => (
                      <>
                        <option key={day} value={day}>
                          {day}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      inputData("bulanLahir", e.target.value);
                    }}
                  >
                    <option readOnly>Pilih Bulan</option>
                    {months.map((month) => (
                      <>
                        <option key={month} value={month}>
                          {month}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      inputData("tahunLahir", e.target.value);
                    }}
                  >
                    <option readOnly>Pilih Tahun</option>
                    {years.map((year) => (
                      <>
                        <option key={year} value={year}>
                          {year}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="bg-app p-1" style={{ fontFamily: "Lilitan One" }}>
            Informasi Tambahan
          </h3>
          <div className="deskripsi" style={{ fontFamily: "Lilitan One" }}>
            Gue ingin mengenal Loe lebih dekat, tanggapan Loe terhadap
            pertanyaan di bawah ini hanya digunakan untuk memastikan bahwa kami
            dapat melayani semua populasi secara merata.
          </div>
          <div className="form-group mt-2">
            <label style={{ fontFamily: "Lilitan One" }}>Usia Saat ini</label>
            <input
              type="number"
              className="form-control"
              placeholder="Masukkan usia"
              onBlur={(e) => {
                inputData("usiaUser", e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-2">
            <label style={{ fontFamily: "Lilitan One" }}>
              Identifikasi Diri Loe
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                inputData("gender", e.target.value);
              }}
            >
              <option readOnly>Pilih salah satu</option>
              <option value="laki-laki">Seorang Laki-laki</option>
              <option value="perempuan">Seorang Perempuan</option>
              <option value="transgander">Seorang Transgander</option>
              <option value="belum bisa menentukan">
                Belum bisa menentukan
              </option>
              <option value="lainnya">Tidak ada satu pun dari opsi ini</option>
            </select>
          </div>
          <div className="form-group mt-2">
            <label style={{ fontFamily: "Lilitan One" }}>
              Loe Suka Berhubungan Sex Dengan?
            </label>
            <select
              className="form-control"
              onChange={(e) => {
                inputData("berhubunganSexDengan", e.target.value);
              }}
            >
              <option readOnly>Pilih salah satu</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
              <option value="transgander">Transgander</option>
              <option value="siapa saja">
                Siapa saja, apapun jenis kelamin mereka
              </option>
              <option value="lainnya">
                Tidak satu pun, saya belum pernah berhubungan seksual
              </option>
            </select>
          </div>

          <div className="form-group mt-5">
            <label style={{ fontFamily: "Lilitan One" }}>
              Apakah Loe dirujuk untuk tes HIV sejak {day} {monthName} {year}?
            </label>
            <div className="row p-3 mt-3">
              <div
                className={`card p-2 col-md-4 ${
                  selectedOption2 === "option1"
                    ? "bg-app border-dark"
                    : "bg-app2"
                }`}
                onClick={() => {
                  handleOptionClick2("option1");
                  inputData("rujukTesHIV", "YA");
                }}
                style={{ marginTop: "-20px" }}
              >
                <center>
                  <span>
                    <span
                      className="bi bi-check"
                      style={{ fontSize: "16pt" }}
                    ></span>{" "}
                    YA
                  </span>
                </center>
              </div>
              <div
                className={`card p-2 col-md-4 ${
                  selectedOption2 === "option2"
                    ? "bg-app  border-dark"
                    : "bg-app2"
                }`}
                onClick={() => {
                  handleOptionClick2("option2");
                  inputData("rujukTesHIV", "TIDAK");
                }}
                style={{ marginTop: "-20px" }}
              >
                <center>
                  <span>
                    <span
                      className="bi bi-x-circle"
                      style={{ fontSize: "16pt" }}
                    ></span>{" "}
                    TIDAK
                  </span>
                </center>
              </div>
            </div>
          </div>

          <div className="form-group mt-5">
            <label style={{ fontFamily: "Lilitan One" }}>
              Apakah Loe sudah melakukan tes HIV sejak 1 {monthName} {year}?
            </label>
            <div className="row p-3">
              <div
                className={`card p-2 col-md-4 ${
                  selectedOption3 === "option1"
                    ? "bg-app border-dark"
                    : "bg-app2"
                }`}
                onClick={() => {
                  handleOptionClick3("option1");
                  inputData("sudahTesHIVBlnIni", "SUDAH");
                }}
                style={{ marginTop: "-20px" }}
              >
                <center>
                  <span>
                    <span
                      className="bi bi-check"
                      style={{ fontSize: "16pt" }}
                    ></span>{" "}
                    SUDAH
                  </span>
                </center>
              </div>
              <div
                className={`card p-2 col-md-4 ${
                  selectedOption3 === "option2"
                    ? "bg-app  border-dark"
                    : "bg-app2"
                }`}
                onClick={() => {
                  handleOptionClick3("option2");
                  inputData("sudahTesHIVBlnIni", "BELUM");
                }}
                style={{ marginTop: "-20px" }}
              >
                <center>
                  <span>
                    <span
                      className="bi bi-x-circle"
                      style={{ fontSize: "16pt" }}
                    ></span>{" "}
                    BELUM
                  </span>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* sesi nama */}

      <style>
        {`
        /* Hapus border default */
            .form-control {
            background-color: #FFF459;
            border: none;
            border-bottom: 1px solid #000000; /* Ganti warna sesuai keinginan Anda */
            border-radius: 10px; /* Untuk memastikan tidak ada radius pada border */
            }

            /* Atur warna garis bawah saat fokus */
            .form-control:focus {
            border-color: #000000; /* Ganti warna sesuai keinginan Anda saat input dalam fokus */
            box-shadow: none; /* Hilangkan shadow saat fokus */
            outline: none; /* Hilangkan outline saat fokus */
            }


          /* CSS untuk checkbox yang lebih menarik */
          .checkbox-container {
            display: flex;
            align-items: center;
            padding-left: 10px;
            margin-bottom: 12px;
            cursor: pointer;
            user-select: none;
          }

          .checkbox-container input {
            cursor: pointer;
          }

          .checkmark {
            width: 25px;
            height: 25px;
            background-color: #fff;
            border: 2px solid #ccc;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: red;
          }

          .card-container {
            display: flex;
            gap: 20px;
          }

          .card {
            border: 2px solid #ccc;
            border-radius: 10px;
            padding: 10px;
          }

          .checkbox-container:hover .checkmark {
            background-color: #f0f0f0;
          }

          .checkbox-container input:checked + .checkmark {
            background-color: #FFF459;
            border: 2px solid #FFDE16;
          }

          /* Tambahkan gaya untuk card yang dipilih */
          .selected {
            border: 2px solid #FFF459;
            background-color: #FFDE16;
          }

          .selected .checkmark {
            background-color: #FFDE16;
          }
        `}
      </style>
    </>
  );
};

export default FormBio;
