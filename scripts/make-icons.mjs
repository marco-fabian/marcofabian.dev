// Gera favicon.svg, favicon.ico e apple-touch-icon.png em public/.
// Uso: node scripts/make-icons.mjs
import { readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const font = await readFile('assets/fonts/Geist-SemiBold.ttf');

async function iconSvg(size, radius) {
  return satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          borderRadius: radius,
          color: '#f5f5f5',
          fontFamily: 'Geist',
          fontWeight: 600,
          fontSize: size * 0.44,
          letterSpacing: -size * 0.02,
        },
        children: 'MF',
      },
    },
    { width: size, height: size, fonts: [{ name: 'Geist', data: font, weight: 600, style: 'normal' }] }
  );
}

const png = (svg, width) => new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();

// ICO com PNGs embutidos (suportado por todos os navegadores atuais)
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const svg = await iconSvg(64, 14);
await writeFile('public/favicon.svg', svg);
await writeFile('public/favicon.ico', ico([16, 32, 48].map((size) => ({ size, data: png(svg, size) }))));
// Apple aplica os cantos arredondados sozinha: ícone quadrado
await writeFile('public/apple-touch-icon.png', png(await iconSvg(180, 0), 180));
console.log('icons written to public/');
