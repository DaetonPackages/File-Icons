
import { parse , stringify } from 'YAML'
import * as Paths from './Paths.js'
import { join } from 'Path'



const { readTextFile , writeTextFile } = Deno;
const { log } = console;



export async function ensureDefaults(){
    
    const { associations : path } = Paths;
    
    const defaults = await readDefaults();
    
    await pack.configs.ensure(path,defaults);
}

async function readDefaults(){
    
    const { default_associations : relative } = Paths;
    const { folder } = pack.paths;
    
    const path = join(folder,relative);
    
    return await readTextFile(path);
}

async function parsedDefaults(){
    const yaml = await readDefaults();
    return parse(yaml);
}

async function parsedConfig () {
    
    const 
        path = configPath(),
        yaml = await readTextFile(path);
    
    return parse(yaml);
}

async function saveConfig (associations) {
    
    const 
        path = configPath(),
        yaml = stringify(associations);
        
    await writeTextFile(path,yaml);   
}


function configPath () {
    
    const { associations : relative } = Paths;
    const { configs : folder } = pack.paths;
    
    return join(folder,relative);
}


import { withoutAll } from 'Without All'

const { entries } = Object;

export async function updateDefaults(){
    
    const 
        defaults = await parsedDefaults() ,
        config = await parsedConfig() ;
    
    
    const used = [ ... Object.values(config) ].flat();
    
    log(used)
    
    for(const [ svg , extensions ] of entries(defaults)){
        
        //  Add unassigned icons
        
        config[svg] ??= extensions;
        
        //  Add unassigned extensions
        
        const unused = withoutAll(extensions,used);
        config[svg].push(...unused);
    }
    
    await saveConfig(config);
}