// TODO: watch for changes, rsync templates dir when anything changes
const config = require('./config.js')
const chokidar = require('chokidar')
const Rsync = require('rsync')
const sh = (cmd) => {
  // execute a shell command synchronously, output to a trimmed string
  return String( require('child_process').execSync(cmd) ).trim()
}


const rsync = new Rsync()
  .flags('OPpart')
  .set('progress')
  .set('no-whole-file')
  .source(config.paths.local + '/.')
  .destination(config.host + ':' + config.paths.remote)

const watcher = chokidar.watch(config.paths.local, {
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300
  }
})

watcher
  .on('ready', () => console.log('watching ' + config.paths.local + '...') )
  .on('all', (path) => {
    console.log()
    console.log('syncing...')
    
    sh('rsync -POrt '+ config.paths.local +'/. '+ config.host +':'+ config.paths.remote)

    console.log('done.')
    console.log()
    console.log('watching ' + config.paths.local + '...')

    /*
    rsync.execute( (err,code,cmd) => {
      const error = (!! err) ? ' (with errors)' : ''
      console.log(err)
      console.log(`done${error}.`)
      console.log()
      // console.log(cmd)
      // console.log()
      console.log('watching ' + config.paths.local + '...')
    })
    */
  })

