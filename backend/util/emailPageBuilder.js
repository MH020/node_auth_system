import fs from 'fs'


export function readPage(path) {
    return fs.readFileSync(path).toString();
}

const singupHTML = fs.readFileSync("./util/emailPages/signup.html").toString();


export function buildSingupEmail(username,verificationCode){
  return singupHTML
  .replace("$$userName$$", username)
  .replace("$$verificationCode$$", verificationCode)
}