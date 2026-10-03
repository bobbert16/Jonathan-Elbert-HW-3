# PokéDex Mini (React + Vite)

Proyek Week 6 — React basics 2. Dibangun bertahap sesuai slide:

| Sesi | Fitur | File utama |
|------|-------|-----------|
| S21 | Daftar Pokémon (useEffect + loading/error/success) | `components/PokemonList.jsx` |
| S22 | Form pencarian (controlled input, preventDefault, validasi) | `components/SearchForm.jsx` |
| S23 | Routing (HashRouter, Link, useParams, 404, guard `isCurrent`) | `App.jsx`, `pages/DetailPage.jsx` |
| S24 | Layout + Outlet, config.js, utils.js, Vite base, gh-pages | `components/Layout.jsx`, `config.js`, `utils.js`, `vite.config.js` |

## Menjalankan
```bash
npm install
npm run dev
```

## Deploy ke GitHub Pages
1. Pastikan `base` di `vite.config.js` sama persis dengan nama repo (default: `/Jonathan-Elbert-HW-3/`).
2. Push kode ke GitHub, lalu:
   ```bash
   npm run deploy
   ```
3. Di GitHub: Settings → Pages → source = branch `gh-pages`.
4. Tes: buka halaman detail (`#/pokemon/pikachu`) lalu refresh — harus tetap terbuka.

## Ganti latar belakang
Taruh GIF/MP4/gambar di folder `public/`, lalu isi `BG_FILE` di `src/config.js`
(contoh: `"background.mp4"`). Kosongkan untuk animasi bawaan.

## Video latar & musik (file kamu sendiri)
- Video latar: taruh `background.mp4` di `public/`, isi `BG_FILE = "background.mp4"` di `src/config.js`.
- Musik: taruh `theme.mp3` di `public/`, isi `MUSIC_FILE = "theme.mp3"`. Tombol "♪ Music" muncul di kiri atas.
- Browser memblokir suara otomatis, jadi musik mulai setelah pengunjung mengklik halaman atau tombol musik.
- Tips: kompres video (≤ 20 MB, 720p) supaya cepat dimuat dan aman untuk batas ukuran file GitHub.
