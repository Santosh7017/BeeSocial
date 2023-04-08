const environment = require('./environment');
const path = require('path');
const fs = require('fs');


module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        
        if(environment.name == 'development'){
            // console.log('/' + filePath);
            return  '/' + filePath;
          
            
        }
       

        // return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];

        const assetManifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')));
    const assetPath = '/' + assetManifest[filePath];
    console.log(`Asset path for ${filePath}: ${assetPath}`);
    return assetPath;
    }
   
}