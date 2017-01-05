#!/usr/bin/env node

const fs = require('fs');
const args = process.argv;
const componentName = process.argv[2];

const NATIVE_TEMPLATE = `import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export default function() {
    return (
        <View></View>
    );
}

const styles = StyleSheet.create({});
`;

const IOS_ANDROID_TEMPLATE = `import Render from './${componentName}Render.native.js';

export default function() {
  return Render.call(this, this.props, this.state);
}
`;

const WEB_TEMPLATE = `import React from 'react';
import styles from './${componentName}.scss';

export default function() {
  return (
    <div></div>
  );
}
`;

const COMPONENT_TEMPLATE = `import React, {Component} from 'react';
import ${componentName}Render from './${componentName}Render';

class ${componentName} extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ${componentName}Render.call(this, this.props, this.state);
    }
}

${componentName}.propTypes = {};

export default ${componentName};
`

const componentDirectory = `./src/components/${componentName}`;
const componentNativeRenderer = `${componentDirectory}/${componentName}Render.native.js`
const componentIOSRenderer = `${componentDirectory}/${componentName}Render.ios.js`
const componentAndroidRenderer = `${componentDirectory}/${componentName}Render.android.js`
const componentWebRenderer = `${componentDirectory}/${componentName}Render.js`
const component = `${componentDirectory}/${componentName}.js`
const componentStyles = `${componentDirectory}/${componentName}.scss`

fs.mkdirSync(componentDirectory);
fs.writeFileSync(componentNativeRenderer, NATIVE_TEMPLATE);
fs.writeFileSync(componentIOSRenderer, IOS_ANDROID_TEMPLATE);
fs.writeFileSync(componentAndroidRenderer, IOS_ANDROID_TEMPLATE);
fs.writeFileSync(componentWebRenderer, WEB_TEMPLATE);
fs.writeFileSync(component, COMPONENT_TEMPLATE);
fs.writeFileSync(componentStyles, '');

