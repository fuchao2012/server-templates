const path = require('path');
const fse = require('fs-extra');

const productPath = path.join(__dirname, '../../');

const DEST_DIRS = 'build/src';
const SRC_DIRS = 'src';

function index() {
    copy();
}

/**
 * copy server下的目录，不包括conf和proxy
 */
function copy() {
    const src = path.join(productPath, SRC_DIRS);
    const dest = path.join(productPath, DEST_DIRS);
    fse.copySync(src, dest);
}

index();
