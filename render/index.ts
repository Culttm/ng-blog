import express, {Request, Response} from 'express'
import {mkdir, readdir, readFile, writeFile} from 'fs/promises'
import * as path from 'path'
import cors from 'cors'

const app = express();


app.use(cors())

const readdirRecursive = async (dir: string) => {
  const files = await readdir(dir, {withFileTypes: true});
  const paths: Promise<any>[] = files.map(async file => {

    const p = path.join(dir, file.name);

    if (file.isDirectory()) {
      return await readdirRecursive(p)
    }

    if (p.endsWith('.html') || p.endsWith('.css') || p.endsWith('.ico')) {
      return p;
    }

    return null

  });
  return (await Promise.all(paths)).flat(Infinity).filter(Boolean);
}

const modifyHtmlFile = async (file: string) => {
  const textContent = await readFile(file, {
    encoding: "utf-8"
  })
  const s = file.split('dist')[1];
  const dots = s.split('static')[1].split('/').length - 1;
  const d = `dist/generated${s.split('/').slice(0, s.split('/').length - 1).join('/')}`;
  const ss = s.split('/').slice(0, s.length - 1)[s.split('/').length - 1];
  const source = {
    file: ss,
    dir: d
  };
  let dot = './';
  for (let i = 0; i < dots; i++) {
    if (i >= 1) {
      dot += '../'
    }
  }
  const content = textContent
    .replace('<base href="/">', '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi, '')
    .replace('href="favicon.ico"', `href="${dot}favicon.ico"`)
    .replaceAll('href="styles.', `href="${dot}styles.`)
    .replaceAll('href="/', `href="${dot}`)
    .replace('</body>', `
        <script>
          const links = document.querySelectorAll('a');
          links.forEach(link => {
            let s = link.getAttribute('href');
            s = s.endsWith('/') ? s.split('/').slice(0, s.split('/').length - 1).join('/') : s;
            link.setAttribute('href', s + '/index.html')
          })
        </script>
      </body>
    `);
  await mkdir(source.dir, {
    recursive: true
  });
  await writeFile(path.join(source.dir, source.file), content, {
    encoding: "utf-8",
  })
  return dot
}

app.get('/', async (req: Request, res: Response) => {
  const folder = path.resolve(process.cwd(), 'dist/static');
  const files = await readdirRecursive(folder);
  for (const file of files) {
    await modifyHtmlFile(file);
  }
  res.json(files)
});

app.listen(3232, () => console.log('http://localhost:3232'))
