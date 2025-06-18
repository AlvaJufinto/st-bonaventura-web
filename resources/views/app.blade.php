<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title inertia>{{ config('app.name', 'Santo Bonaventura') }}</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
    rel="stylesheet">

  <!-- Primary Meta Tags -->
  <title>Santo Bonaventura Paroki Pulomas</title>
  <meta name="title" content="Santo Bonaventura Paroki Pulomas" />
  <meta name="description"
    content="Gereja Santo Bonaventura adalah sebuah gereja paroki Katolik yang berlokasi di Jakarta Timur, Indonesia. Gereja ini berada di bawah pengelolaan Keuskupan Agung Jakarta. Secara parokial, Gereja ini merupakan Paroki Pulomas. Gereja Santo Bonaventura dinamai menurut Bonaventura, seorang uskup dan pujangga gereja" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://stbonaventura.org/" />
  <meta property="og:title" content="Santo Bonaventura Paroki Pulomas" />
  <meta property="og:description"
    content="Gereja Santo Bonaventura adalah sebuah gereja paroki Katolik yang berlokasi di Jakarta Timur, Indonesia. Gereja ini berada di bawah pengelolaan Keuskupan Agung Jakarta. Secara parokial, Gereja ini merupakan Paroki Pulomas. Gereja Santo Bonaventura dinamai menurut Bonaventura, seorang uskup dan pujangga gereja" />
  <meta property="og:image"
    content="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Tampak_Luar_Gereja_Santo_Bonaventura_2024.png/1920px-Tampak_Luar_Gereja_Santo_Bonaventura_2024.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://stbonaventura.org/" />
  <meta property="twitter:title" content="Santo Bonaventura Paroki Pulomas" />
  <meta property="twitter:description"
    content="Gereja Santo Bonaventura adalah sebuah gereja paroki Katolik yang berlokasi di Jakarta Timur, Indonesia. Gereja ini berada di bawah pengelolaan Keuskupan Agung Jakarta. Secara parokial, Gereja ini merupakan Paroki Pulomas. Gereja Santo Bonaventura dinamai menurut Bonaventura, seorang uskup dan pujangga gereja" />
  <meta property="twitter:image"
    content="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Tampak_Luar_Gereja_Santo_Bonaventura_2024.png/1920px-Tampak_Luar_Gereja_Santo_Bonaventura_2024.png" />


  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
  @inertiaHead
</head>

<body class="font-sans antialiased">
  @inertia
</body>

</html>
