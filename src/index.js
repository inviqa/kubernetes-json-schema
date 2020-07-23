require('ts-node').register();
const App = require('./app')

async function run() {
    const schemas = await App.readCrdSchemasFromDirectory('manifests')
    await App.writeSchemasTo('docs/schema/master-standalone', schemas)
}

run()
