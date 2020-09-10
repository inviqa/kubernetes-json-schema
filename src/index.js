require('ts-node').register();
const App = require('./app')

async function run() {
    const schemas = await App.readCrdSchemasFromDirectory('manifests')
    await App.writeSchemasTo('docs/schema/master-standalone', schemas)
    // though there are later releases of 1.17, kubeval schemas only supplies up to 1.17.4
    await App.writeSchemasTo('docs/schema/1.17.4-standalone', schemas)
}

run()
