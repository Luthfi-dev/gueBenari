// pages/login.js
import React from "react";

import FormGroup from "@mui/material/FormGroup";
import Link from "next/link";
import Typography from "@mui/material/Typography";

const CardHasil = () => {
  return (
    <div className="row mt-1">
      <Typography className="col-md-4 d-md-block">
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
            src={`/assets/svg/agree.svg`}
            alt="illustrasi pendukung"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              // borderRadius: "50%",
            }}
          />
        </div>
        <center style={{ marginTop: "-30px" }}>
          <b>
            <h1 style={{ fontFamily: "Fira Sans" }}>MANTAP</h1>
            <h3 style={{ fontFamily: "Lilita One" }}>
              Kemungkinan Loe Terbebas HIV
            </h3>
          </b>
        </center>
      </Typography>
      <Typography sx={{ mt: 3, mb: 1 }} className="col-md-8">
        <FormGroup className="m-2">
          {/* // bagian menampilkan konten */}
          <center>
            <h2 style={{ fontFamily: "Fira Sans" }}>Untuk Lebih Akurat</h2>
            <h4 style={{ fontFamily: "Lilita One" }}>
              Loe Bisa Cek Langsung ke Tempat Gue Terdekat!
            </h4>
            <Typography className="col-md-4 d-md-block">
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
                  src={`/assets/svg/house-search.svg`}
                  alt="illustrasi pendukung"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    // borderRadius: "50%",
                  }}
                />
              </div>
            </Typography>
            <Link
              href="https://gueberani.com/kota-gue-2/"
              className="btn btn-warning"
              style={{ marginTop: "-100px", fontFamily: "Fira Sans" }}
            >
              Cek Kota Loe
            </Link>
          </center>
        </FormGroup>
      </Typography>
    </div>
  );
};

export default CardHasil;
