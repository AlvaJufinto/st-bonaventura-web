# St. Bonaventure Parish Website

Official website of **St. Bonaventure Catholic Church – Pulo Mas Parish**, built using Laravel, Inertia.js, and React.

🔗 Live site: [https://stbonaventura.org](https://stbonaventura.org)

---

## ✨ Features

- 🕊️ Mass schedules and liturgical information
- 📋 Online registration for sacraments (e.g., Confirmation)
- 📖 Daily and weekly spiritual reflections
- 📢 News, events, and announcements
- 🧭 Territorial and neighborhood structure
- 👤 Admin panel (under development)

---

## ⚙️ Tech Stack

- **Backend:** Laravel 10
- **Frontend:** React + Inertia.js
- **Styling:** Tailwind CSS
- **Icons:** Lucide
- **Build Tool:** Vite

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```
git clone https://github.com/AlvaJufinto/st-bonaventura-web.git
cd st-bonaventura-web
composer install
npm install
```

Set up your `.env`:

```
cp .env.example .env
php artisan key:generate
```

Run the development server:

```
php artisan serve
npm run dev
```

---

## 📁 Project Structure

```
├── app/               # Laravel backend (controllers, models)
├── resources/
│   └── js/            # React + Inertia components
│   └── views/         # Blade template (main entry)
├── public/            # Static assets and entry point
├── routes/            # Web and API routes
├── database/          # Migrations and seeders
```

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

This project was created to support the digital presence of **Gereja Katolik St. Bonaventura**, serving the faithful in the Pulo Mas region of Jakarta.
