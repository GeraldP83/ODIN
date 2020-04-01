import dotenv from 'dotenv'
import fs from 'fs'
import electron from 'electron'
dotenv.config()

const appData = (electron.app || electron.remote.app).getPath('appData')

export const odinHome = () => {
  const odinHome = process.env.ODIN_HOME
  if (!odinHome || !fs.existsSync(odinHome)) return appData
  return odinHome
}
