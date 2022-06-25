
import { ensureDefaults , updateDefaults } from './Associations.js'

const { log } = console;


export async function activate(pack){

    log(`Starting 'File Icons' package`);

    window.pack = pack;
    
    await ensureDefaults();
    await updateDefaults();
}


