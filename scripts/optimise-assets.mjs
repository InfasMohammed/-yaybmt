// Encode the existing illustrative hero for static delivery; original files stay unchanged.
import sharp from 'sharp';
import {statSync} from 'node:fs';
const source='public/images/hero-marine.png';
const target='public/images/hero-marine.webp';
await sharp(source).webp({quality:82,effort:6}).toFile(target);
console.log('Static hero bytes:',{original:statSync(source).size,webp:statSync(target).size});
