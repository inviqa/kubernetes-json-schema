require('ts-node').register();
const App = require('./app')

async function run() {
    const schemas = await App.readCrdSchemasFromDirectory('manifests')
    // future additional versions of supported k8s releases should be added
    await App.writeSchemasTo('docs/schema/master-standalone', schemas)
    await App.writeSchemasTo('docs/schema/1.17.4-standalone', schemas)
    await App.writeSchemasTo('docs/schema/1.18.20-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.19.16-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.20.15-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.21.9-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.22.6-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.22.9-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.23.2-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.23.3-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.23.4-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.23.5-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.23.6-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.23.7-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.24.0-standalone', schemas)
    await App.writeSchemasTo('docs/schema/v1.24.1-standalone', schemas)
}

run()
