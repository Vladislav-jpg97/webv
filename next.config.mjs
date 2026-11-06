import fs from 'node:fs';
import path from 'node:path';

// Если /public/images/profile.webp существует на момент сборки/запуска — сайт показывает фото,
// иначе рисует монограмму и не делает лишний запрос (без 404 в консоли).
const hasPhoto = fs.existsSync(path.join(process.cwd(), 'public', 'images', 'profile.webp'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: { NEXT_PUBLIC_HAS_PHOTO: hasPhoto ? '1' : '0' },
};
export default nextConfig;
