"use client";
import { HeroParallax } from "./hero-parallax";

export const HeroParallaxDemo = () => {
  // Investment projects/marketplace showcase
  const products = [
    {
      title: "The Residents – Inversión Inmobiliaria",
      link: "/invest/project1",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png",
    },
    {
      title: "Fondo de Criptomonedas",
      link: "/invest/project2",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png",
    },
    {
      title: "Campo Santa Lucía",
      link: "/invest/project3",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/v1762901056/Investoken/IMG_3016_wvsdt9.jpg",
    },
    {
      title: "Tokenización de Ganado",
      link: "/invest/project4",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1762901062/Investoken/IMG_3014_wbml4i.jpg",
    },
    {
      title: "Polo Horse Token",
      link: "/invest/project5",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1762901052/Investoken/2F732387-0F70-4B32-B07E-8F3E7D1A3F7B_rnfbis.png",
    },
    {
      title: "Recital Tokenizado – LUNA EN VIVO",
      link: "/invest/project6",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1762901058/Investoken/IMG_3028_c95kop.jpg",
    },
    {
      title: "The Residents – Sala Interior",
      link: "/invest/project1",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/v1762901059/Investoken/IMG_2914_pewjb8.jpg",
    },
    {
      title: "Campo Santa Lucía – Detalles",
      link: "/invest/project3",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/v1762901055/Investoken/IMG_3017_wissmv.jpg",
    },
    {
      title: "Polo Horse – Ambassador",
      link: "/invest/project5",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1762901053/Investoken/E0B55D18-7D54-4CE1-BFE4-87B7153BD6EC_pbmnjr.png",
    },
    {
      title: "The Residents – Exterior",
      link: "/invest/project1",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/v1762901063/Investoken/IMG_2923_t7diap.jpg",
    },
    {
      title: "Ganadería – Trazabilidad",
      link: "/invest/project4",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1762901059/Investoken/IMG_3013_eqecdo.jpg",
    },
    {
      title: "Luna en Vivo – Escenario",
      link: "/invest/project6",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1762901054/Investoken/IMG_3026_o8de0r.jpg",
    },
    {
      title: "The Residents – Amenities",
      link: "/invest/project1",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/v1762901064/Investoken/IMG_2917_z2iaht.jpg",
    },
    {
      title: "Polo Horse – Equitación",
      link: "/invest/project5",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1762901060/Investoken/IMG_3020_piphv0.jpg",
    },
    {
      title: "Luna en Vivo – Promoción",
      link: "/invest/project6",
      thumbnail:
        "https://res.cloudinary.com/dhacybdxf/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1762901059/Investoken/IMG_3027_im8miq.jpg",
    },
  ];

  return (
    <HeroParallax
      products={products}
      headerTitle="Oportunidades de Inversión"
      headerDescription="Acceso a proyectos de inversión tokenizados. Participa en grandes oportunidades con pequeñas inversiones, diversifica tu portafolio y crece tu patrimonio de forma segura."
    />
  );
};
