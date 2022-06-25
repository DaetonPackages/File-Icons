
import { ensureDefaults , updateDefaults } from './Associations.js'

const { log } = console;


let self;


export function pack(){
    return self;
}

export async function activate(pack){

    log(`Starting 'File Icons' package`);

    self = pack;
    
    await ensureDefaults();
    await updateDefaults();
}


