# 📚 REST API Komik dengan JWT Authentication

REST API sederhana untuk mengelola data komik (CRUD) yang dilengkapi sistem **register dan login** menggunakan **JSON Web Token (JWT)**. Endpoint untuk menambah, mengubah, dan menghapus komik hanya bisa diakses oleh user yang sudah login.

> Praktikum Pemrograman Web Service (PWS), Pertemuan 11
> Dibuat oleh: **Restu Chandra Fitrianto** (**20240140176**)

---

## ✨ Fitur

- Register user baru (password di-hash dengan **bcrypt**)
- Login dan mendapatkan **JWT token**
- CRUD data komik
- Middleware autentikasi untuk melindungi endpoint tertentu
- Tabel database dibuat otomatis oleh **Sequelize** (`sync`)

## 🛠️ Teknologi

| Teknologi | Fungsi |
| --- | --- |
| Node.js + Express | Web server dan routing |
| PostgreSQL + pg | Database |
| Sequelize | ORM |
| jsonwebtoken | Membuat dan memverifikasi token JWT |
| bcrypt | Hash password |
| dotenv | Mengelola environment variable |
| nodemon | Auto-restart server saat development |

## 📁 Struktur Project

```
.
├── config/
│   ├── config.js          # Konfigurasi Sequelize (dari .env)
│   └── db.js              # Koneksi dan sinkronisasi database
├── controller/
│   ├── komikController.js # Logika CRUD komik
│   └── userController.js  # Logika register dan login
├── middleware/
│   └── authMiddleware.js  # Verifikasi token JWT
├── migrations/
├── models/
│   ├── index.js
│   ├── komik.js
│   └── user.js
├── routes/
│   └── api.js             # Daftar endpoint
├── seeders/
├── .env                   # Tidak di-commit (lihat .gitignore)
├── .gitignore
├── .sequelizerc
├── index.js               # Entry point aplikasi
└── package.json
```

## 🚀 Cara Menjalankan

### 1. Clone repository

```bash
git clone <url-repository-kamu>
cd <nama-folder-project>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Siapkan database

Buat database kosong di PostgreSQL, misalnya lewat pgAdmin atau `psql`:

```sql
CREATE DATABASE perpustakaan;
```

### 4. Buat file `.env`

Buat file `.env` di root project, lalu sesuaikan isinya:

```env
DB_USER=postgres
DB_PASS=password_database_kamu
DB_DATABASE=perpustakaan
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DIALECT=postgres

JWT_SECRET=isi_dengan_secret_key_kamu
JWT_EXPIRES=1d
```

### 5. Jalankan server

```bash
npm start
```

Kalau berhasil, terminal akan menampilkan:

```
Database connected successfully
Database synchronized
Server running at http://localhost:3000
```

Tabel `Users` dan `Komiks` akan dibuat otomatis.

---

## 📡 Daftar Endpoint

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Auth | Keterangan |
| --- | --- | :---: | --- |
| `POST` | `/register` | ❌ | Daftar user baru |
| `POST` | `/login` | ❌ | Login dan mendapatkan token |
| `GET` | `/komik` | ❌ | Ambil semua komik |
| `GET` | `/komik/:id` | ❌ | Ambil satu komik berdasarkan ID |
| `POST` | `/komik` | ✅ | Tambah komik baru |
| `PUT` | `/komik/:id` | ✅ | Update komik |
| `DELETE` | `/komik/:id` | ✅ | Hapus komik |

Endpoint bertanda ✅ membutuhkan header:

```
Authorization: Bearer <token>
```

### Contoh Request Body

**Register / Login**

```json
{
  "email": "sc@gmail.com",
  "password": "12345"
}
```

**Tambah / Update Komik**

```json
{
  "title": "Naruto Uzumaki",
  "author": "Masashi Kishimoto",
  "description": "Komik ninja"
}
```

### Kode Response

| Kode | Arti |
| --- | --- |
| `200` | Berhasil |
| `201` | Data berhasil dibuat |
| `400` | Email atau password belum diisi |
| `401` | Email atau password salah, atau token tidak ada, tidak valid, atau sudah kedaluwarsa |
| `404` | Komik tidak ditemukan |
| `409` | Email sudah terdaftar |
| `500` | Kesalahan di server |

---

## 🧪 Hasil Pengujian (Postman)

### 1. Register

User baru berhasil didaftarkan. Password disimpan dalam bentuk hash.

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/a7535a23-e3a3-416f-8f1a-c047b21ac00d" />

### 2. Login

Login dengan email dan password yang sama menghasilkan token JWT.

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/3ee26e63-9bba-410a-9ac7-31f165cf1f7e" />

### 3. Memasang Token

Token disalin ke tab **Authorization** dengan tipe **Bearer Token**.

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/a0561def-3ad0-4688-926b-90501a295ae8" />

### 4. Tambah Komik (POST)

Request dengan token yang valid menghasilkan status `201 Created`.

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/db47c62b-4874-43ac-b736-b33309ffa888" />

### 5. Ambil Semua Komik (GET)

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/78397364-7059-4053-927e-40e7629bc953" />

### 6. Ambil Komik Berdasarkan ID (GET)

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/c31acdf8-41a2-4cc0-910d-211022096ca5" />

### 7. Update Komik (PUT)

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/13686d42-2238-4c04-bf96-21b0abf52c1c" />

### 8. Hapus Komik (DELETE)

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/e7255af8-eff5-4dd4-8742-d5a35fea691c" />

### 9. Bukti Komik Sudah Terhapus

Setelah dihapus, `GET` pada ID yang sama mengembalikan `404 Komik not found`.

<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/04080e82-f746-4323-bc57-3b5b223d867c" />

---

## 🔐 Catatan Keamanan

- File `.env` sudah masuk `.gitignore`, jadi password database dan `JWT_SECRET` tidak ikut ter-upload ke GitHub.
- Password user tidak disimpan langsung, tetapi di-hash dengan bcrypt.
- Token JWT berlaku selama waktu yang diatur di `JWT_EXPIRES` (default 1 hari). Setelah itu user harus login ulang.
