import fs from 'fs'
import path from 'path'
import electron from 'electron'

const appData = (electron.app || electron.remote.app).getPath('appData')
const rootDir = (electron.app || electron.remote.app).getAppPath()
const settingsPath = path.join(rootDir, '/settings.json')

export const homePath = () => {
  try {
    const settings = JSON.parse(fs.readFileSync(settingsPath))
    if (settings.home !== 'default' && fs.existsSync(settings.home)) return settings.home
    return appData
  } catch (error) {
    console.error('Cannot parse JSON from : ' + settingsPath + 'setting project home to: ' + appData)
    return appData
  }
}
