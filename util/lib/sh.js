// execute a shell command synchronously, output to a trimmed string

exports.sh = cmd => {
  return String(require('child_process').execSync(cmd)).trim()
}
