import fs from 'fs'
import { exec } from 'child_process'
import { $ } from 'bun'
import https from 'https'

const writeFile = () => {
  fs.readdir('node_modules/.prisma/client', (err, files) => {
    if (err) {
      console.error(err)
      return
    }
    files.forEach((file) => {
      if (file.endsWith('.d.ts')) {
        const data = fs.readFileSync(
          `node_modules/.prisma/client/${file}`,
          'utf8',
        )
        fs.copyFileSync(
          `node_modules/.prisma/client/${file}`,
          `modelLinkType/${file}`,
        )
      }
    })
    const data = fs.readFileSync('modelLinkType/index.d.ts', 'utf8')
    console.log(data.includes('@prisma/client/runtime/library.js'))
    // 替换文本
    const newData = data.replace(
      '@prisma/client/runtime/library.js',
      './library.d.ts',
    )
    // 写入文件
    fs.writeFileSync('modelLinkType/index.d.ts', newData)
  })

  fs.copyFileSync(
    'node_modules/@prisma/client/runtime/library.d.ts',
    'modelLinkType/library.d.ts',
  )

  // 读取文件
}

const getPackageVersion = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get('https://registry.npmjs.org/modellinktype', (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(data)['dist-tags']['latest'])
      })
    })
  })
}

const uploadNpm = async () => {
  writeFile()
  const version = await getPackageVersion()
  const newVersion = version.split('.')
  newVersion[2] = (parseInt(newVersion[2]) + 1).toString()
  const newVersionStr = newVersion.join('.')
  console.log(newVersionStr)
  const data = fs.readFileSync('modelLinkType/package.json', 'utf8')
  const newData = data.replace(version, newVersionStr)
  fs.writeFileSync('modelLinkType/package.json', newData)
}
uploadNpm()
