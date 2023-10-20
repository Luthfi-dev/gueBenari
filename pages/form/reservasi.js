// pages/login.js
import React from "react";
import { Helmet } from "react-helmet";
// import ManagReservasi from "@/components/ManagForm/ManagReservasi";
import { UserLayout } from "@/components/User/UserLayout";

import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/ManagForm/ManagReservasi"), {
  ssr: false,
});

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>GueBerani - Reservasi</title>

        <meta
          name="description"
          content="Halaman login untuk para penulis/kontributor thinkepic."
        />
        <meta name="keywords" content="login, penulis/kontributor thinkepic" />
      </Helmet>
      {/* desktop */}
      <UserLayout>
        <NoSSR />
      </UserLayout>
    </div>
  );
};

export default Menu;
