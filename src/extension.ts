import * as vscode from 'vscode'
import { Status } from './enum'
import { seriousWarning, warning } from './message'

let timer: NodeJS.Timer
const DEADLINE = 4

export function activate(context: vscode.ExtensionContext) {
  let bussyCount = 0
  // 初始化计时器
  timer = setInterval(() => {
    vscode
      .window
      .showInformationMessage(warning, Status.drink, Status.bussy)
      .then((response) => {
        if (response === Status.bussy) {
          bussyCount += 1
          if (bussyCount >= DEADLINE) {
            vscode.window.showInformationMessage(seriousWarning)
            bussyCount = 0
          }
        }
      })
  }, 30 * 60 * 1000)
}

export function deactivate() {
  clearInterval(timer)
}
